const mongoose = require('mongoose');
const { MONGODB_URI } = require('./env');

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connected');
}

module.exports = { connectDB };
