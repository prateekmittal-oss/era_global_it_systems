import mongoose from 'mongoose';

/**
 * Cached connection for serverless (Vercel) — reuse across warm invocations
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB using Mongoose (safe for local + Vercel serverless)
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined. Set it in .env or Vercel Environment Variables.');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB Connected: ${cached.conn.connection.host}`);
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error(`MongoDB Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
