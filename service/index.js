const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;


const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL 
  credentials: true,  // Allow sending and receiving cookies
};
app.use(cors(corsOptions));

app.use(express.json());


let users = {}; 
let scores = [];

function updateScores(newScore) {
  console.log("Before update:", scores); // Log scores before updating
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
  console.log("After update:", scores); // Log scores after updating
  return scores;
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
  // Just return the username without using session
  res.status(200).json({ message: 'Login successful', username });
});

// Logout a user
app.post('/api/logout', (req, res) => {
  // No session to destroy, just a logout message
  res.status(200).json({ message: 'Logout successful' });
});

// Submit a score (no longer need a session check)
app.post('/api/score', (req, res) => {
  const { username, score } = req.body; // Assume username is sent with the score
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
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

// Get a random fact (Useless Facts API)
app.get('/api/funfact', async (req, res) => {
  try {
    const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
    if (response.data && response.data.text) {
      res.json({ fact: response.data.text });
    } else {
      res.status(500).json({ message: 'Fun fact could not be loaded at this time.' });
    }
  } catch (error) {
    console.error('Error fetching fun fact:', error);
    res.status(500).json({ message: 'Fun fact could not be loaded at this time.' });
  }
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
