const mongoose = require('mongoose');

//Define the MongoDB connection Url
const mongoURL = 'mongodb://localhost:27017/hotels' ; //Replace with your 'hotels' name

mongoose.connect(mongoURL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));

const db = mongoose.connection;

db.on('connected', () =>{
	 console.log ('Connected to MongoDB server');
});

db.on('error', (err) =>{
	 console.error ('MongoDB connection error:', err);
});



db.on('disconnected', () =>{
	 console.log ('MongoDB disconnected');
});

module.exports = db;