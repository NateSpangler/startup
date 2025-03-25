const express = require('express');
const path = require('path');
const uuid = require('uuid');
const app = express();

const setAuthCookie = (res, token) => {
  res.cookie('auth_token', token, {
    httpOnly: true, // Helps prevent XSS attacks
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration (1 day in milliseconds)
    sameSite: 'Strict', // Prevents CSRF attacks
  });
};


let scores = [];
let users = [];
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const cors = require('cors');
app.use(cors()); // Enable CORS for all routes


// JSON body parsing using built-in middleware
app.use(express.json());

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));
console.log('Serving static files from dist folder');

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});


// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores (no authentication needed)
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// SubmitScore (no authentication needed)
apiRouter.post('/score', (req, res) => {
  scores = updateScores(req.body);
  res.send(scores);
});

async function createUser(name) {
  if (!name) {
    throw new Error('Name is required');
  }
  const user = {
    name,
    token: uuid.v4(), // Ensure you have `const uuid = require('uuid');` at the top
  };
  users.push(user);
  return user;
}


// Create a new user
apiRouter.post('/auth/create', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const user = await createUser(name);
    setAuthCookie(res, user.token);
    res.json({ name: user.name, token: user.token });
  } catch (error) {
    console.error("Error in /api/auth/create:", error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// This catch-all route will send the index.html for any non-API requests
app.get('*', (req, res) => {
  console.log('Sending index.html');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// updateScores considers a new score for inclusion in the high scores.
function updateScores(newScore) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
