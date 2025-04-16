import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios'; 
import { connectToDB } from './mongoClient.js'; // Import the MongoDB connection function



const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());


app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Add a user and score the to the scores db
app.post('/api/score', async (req, res) => {
  const { username, score } = req.body;
  console.log("POST /api/score hit", req.body);

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  if (score === undefined) {
    return res.status(400).json({ message: 'Score is required' });
  }

  try {
    const db = await connectToDB();
    
    // Authenticate that the user exists in the users db
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(403).json({ message: 'User not registered. Score not allowed.' });
    }

    // Save the score
    const collection = db.collection('scores');
    await collection.insertOne({ username, score });

    res.status(200).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: 'Error saving score' });
  }
});



// Logout a user
 app.post('/api/logout', (req, res) => {
   // No session to destroy, just a logout message
   res.status(200).json({ message: 'Logout successful' });
 });


app.get('/api/scores', async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection('scores');
    // Query for the top 10 scores, sorted descending
    const highscores = await collection.find({})
      .sort({ score: -1 })
      .limit(10)
      .toArray();
    res.status(200).json(highscores);
  } catch (err) {
    console.error('Error fetching scores:', err);
    res.status(500).json({ message: 'Error fetching scores' });
  }
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

// Check if user is registered in user db and add them if not
app.post('/api/register', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const db = await connectToDB();
    const users = db.collection('users');

    // Check if the user already exists
    const existingUser = await users.findOne({ username });

    if (!existingUser) {
      await users.insertOne({ username });
      console.log('New user registered:', username);
    }

    res.status(200).json({ message: 'User registration checked' });
  } catch (error) {
    console.error('Error checking/adding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


import http from 'http';
import { WebSocketServer } from 'ws';

// Create HTTP server from Express app
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  ws.send('WebSocket connected!');

  // You can listen for messages from the client like this
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});












