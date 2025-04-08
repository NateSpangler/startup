const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);


let _db = null;

async function connectToDB() {
  if (!_db) {
    await client.connect();
    console.log(`Connected to MongoDB: ${config.hostname}`);
    _db = client.db(config.dbName);
  }
  return _db;
}

module.exports = { connectToDB };
