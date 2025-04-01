const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Session middleware
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

let users = {}; // Store users in-memory (consider using a database in production)
let scores = [];

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

// Middleware to check if user is logged in
function requireLogin(req, res, next) {
  if (!req.session.username) {
    return res.status(401).json({ message: 'You must be logged in to perform this action.' });
  }
  next();
}

// Login or register a user
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  if (!users[username]) {
    users[username] = { username };
  }
  req.session.username = username;
  res.status(200).json({ message: 'Login successful', user: users[username] });
});

// Logout a user
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logout successful' });
});

// Submit a score (restricted to logged-in users)
app.post('/api/score', requireLogin, (req, res) => {
  const { score } = req.body;
  const username = req.session.username;
  if (score === undefined) {
    return res.status(400).json({ message: 'Score is required' });
  }
  scores = updateScores({ name: username, score });
  res.status(200).json(scores);
});

// Get high scores
app.get('/api/scores', (req, res) => {
  res.status(200).json(scores);
});

// Catch-all route for serving the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Default error handler
app.use((err, req, res, next) => {
  res.status(500).json({ type: err.name, message: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
