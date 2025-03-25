const express = require('express');
const path = require('path');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Enable CORS if needed
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));
console.log('Serving static files from dist folder');

function updateScores(newScore) {
  let found = false;

  // Insert the new score in the correct position
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

  // Trim to top 10 scores
  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}



app.post('/api/score', (req, res) => {
  const { name, score } = req.body;

  if (!name || !score) {
    return res.status(400).json({ message: 'Name and score are required' });
  }

  // Update the scores with the new score and name
  scores = updateScores({ name, score });
  
  res.status(200).send(scores);
});



// This catch-all route will send the index.html for any non-API requests
app.get('*', (req, res) => {
  console.log(`Incoming request for ${req.url}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
