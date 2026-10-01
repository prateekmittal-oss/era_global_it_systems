import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import assetRoutes from './routes/assetRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Ensure DB is connected before handling API routes (needed for Vercel serverless)
 */
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Database connection failed: ${error.message}`,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'ERA IT AMS API is running' });
});

// API routes
app.use('/api/assets', assetRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
