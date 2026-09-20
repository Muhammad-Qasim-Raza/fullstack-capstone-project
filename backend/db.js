const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "giftlink";
let client;
let db;

async function connectToDatabase() {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

async function closeDatabase() {
  if (client) await client.close();
  client = null;
  db = null;
}

module.exports = { connectToDatabase, closeDatabase };
