const Mongoose = require('mongoose');
const config = require('./config');

Mongoose.Promise = global.Promise;
Mongoose.connect(config.database.url, { useMongoClient: true });

const db = Mongoose.connection;

db.on('error', () => {
  console.log(`MongoDB connection error ${config.database.url} \nPlease make sure MongoDB is running.`);
  process.exit();
});

db.once('open', () => {
  console.log('MongoDB connection with database succeeded.');
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection disconnected through app termination.');
    process.exit();
  });
});

module.exports = db;
