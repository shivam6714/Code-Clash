import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env';
import healthRouter from './routes/health';
import authRouter from './routes/auth.routes';
import problemRouter from './routes/problem.routes';
import { setupSocket } from './socket';

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/problems', problemRouter);

// Socket.io
setupSocket(httpServer);

// Connect to MongoDB and then start the server
const startServer = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(config.MONGODB_URI as string);
    console.log('MongoDB connection successful.');
    
    // Auto-migrate legacy/missing ratings to default 300 ELO
    const { User } = await import('./models/User');
    await User.updateMany(
      { $or: [{ rating: { $exists: false } }, { rating: 1000 }] },
      { $set: { rating: 300, highestRating: 300 } }
    );
    
    httpServer.listen(config.PORT, () => {
      console.log(`Backend is healthy and running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

startServer();
