import { MongoClient } from 'mongodb';
import config from './dbConfig.js';

// Construct the MongoDB connection URI from config
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
// Create a new MongoClient instance
const client = new MongoClient(url);

// Cache the database instance once connected
let _db = null;

/**
 * Connects to the MongoDB database and returns the database instance.
 * Uses a cached instance if already connected.
 */
export async function connectToDB() {
  if (!_db) {
    await client.connect();
    console.log(`Connected to MongoDB: ${config.hostname}`);
    _db = client.db(config.dbName);
  }
  return _db;
}
