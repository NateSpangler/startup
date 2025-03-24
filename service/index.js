const express = require('express');
const path = require('path');
const uuid = require('uuid');
const app = express();

let scores = [];
let users = [];
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

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

// Create a new user
apiRouter.post('/auth/create', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ error: 'Name is required' });
  }

  const user = {
    name,
    token: uuid.v4(), // Generate a unique token for the user
  };

  users.push(user);

  res.send({ name: user.name, token: user.token });
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// This catch-all route will send the index.html for any non-API requests
app.get('*', (req, res) => {
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
