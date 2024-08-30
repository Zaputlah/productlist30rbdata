// lib/dbConnect.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environment variable inside .env.local');
}

let cachedDb = null;

async function dbConnect() {
  if (cachedDb) {
    return cachedDb;
  }

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    cachedDb = await mongoose.connect(MONGODB_URI, options);
    console.log('Connected to database');
    return cachedDb;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export default dbConnect;
