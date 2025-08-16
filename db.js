const mongoose = require('mongoose');
require('dotenv').config(); 


const mongoURL = process.env.MONGODB_URI;


// const mongoURL = process.env.MONGODB_URI_LOCAL;

if (!mongoURL) {
  throw new Error('❌ MongoDB URI is not defined in your .env file');
}


const connectionOptions = {
  serverSelectionTimeoutMS: 5000,
  maxPoolSize: 10,
  ssl: mongoURL.startsWith('mongodb+srv'), // Atlas requires SSL
  tlsAllowInvalidCertificates: false
};


mongoose.connect(mongoURL, connectionOptions)
  .then(() => {
    console.log(mongoURL.startsWith('mongodb+srv')
      ? '✅ MongoDB Atlas connection established'
      : '✅ Local MongoDB connection established');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });


const db = mongoose.connection;

db.on('connected', () => {
  console.log(`📡 Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', (err) => {
  console.error('💥 MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});


process.on('SIGINT', async () => {
  await db.close();
  console.log('🔌 MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = db;
