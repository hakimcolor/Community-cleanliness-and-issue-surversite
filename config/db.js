const mongoose = require('mongoose');

// encode credentials to handle special characters in passwords
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);

if (!username || !password) {
  throw new Error('DB_USERNAME or DB_PASSWORD environment variable is missing');
}

const uri = `mongodb+srv://${username}:${password}@cluster0.wcellxl.mongodb.net/?retryWrites=true&w=majority`;

let isConnected = false;

async function connectDB() {
  // use readyState instead of a flag — more reliable across serverless invocations
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(uri, {
    dbName: 'CommunityCln',
    serverSelectionTimeoutMS: 5000, // fail fast on Vercel instead of hanging 30s
  });

  isConnected = true;
  console.log('Mongoose connected');
}

module.exports = connectDB;
