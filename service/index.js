import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
//import cors from 'cors';
import axios from 'axios'; 
import { connectToDB } from './mongoClient.js'; // Import the MongoDB connection function

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// app.use(cors({
//   origin: (origin, callback) => {
//     const allowedOrigins = ['http://localhost:5173', 'https://startup.pongchaos.com'];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type'],
//   credentials: true, // Ensure credentials are allowed
// }));

// Handle OPTIONS preflight requests specifically
app.options('/api/score', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // or use 'https://startup.pongchaos.com' for production
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // No content for OPTIONS response
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));




app.post('/api/score', async (req, res) => {
  const { username, score } = req.body;
  console.log("POST /api/score hit", req.body); // Add this line

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  if (score === undefined) {
    return res.status(400).json({ message: 'Score is required' });
  }

  try {
    const db = await connectToDB();
    const collection = db.collection('scores');
    // Insert the new score. You might also choose to include a timestamp.
    await collection.insertOne({ username, score});
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

app.get('/api/insert-test', async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection('testCollection');
    const result = await collection.insertOne({ hello: 'world' });
    res.status(200).json({ message: 'Data inserted!', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Insert failed', error: err.message });
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


// Catch-all route for serving the frontend
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'));
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Default error handler
app.use((err, req, res, next) => {
  if (req.method === 'OPTIONS') {
    // Let OPTIONS requests fail silently if CORS rejects them
    res.sendStatus(204);
  } else {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
