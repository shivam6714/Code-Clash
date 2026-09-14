import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env';
import healthRouter from './routes/health';
import authRouter from './routes/auth.routes';
import problemRouter from './routes/problem.routes';
import matchRouter from './routes/match.routes';
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
app.use('/api/matches', matchRouter);

// Socket.io
setupSocket(httpServer);

// Connect to MongoDB and then start the server
const startServer = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(config.MONGODB_URI as string);
    console.log('MongoDB connection successful.');
    
    // Auto-migrate legacy/missing ratings to default 300 ELO and ensure createdAt exists
    const { User } = await import('./models/User');
    await User.updateMany(
      { $or: [{ rating: { $exists: false } }, { rating: 1000 }] },
      { $set: { rating: 300, highestRating: 300 } }
    );
    await User.updateMany(
      { createdAt: { $exists: false } },
      { $set: { createdAt: new Date() } }
    );
    
    httpServer.listen(config.PORT, () => {
      console.log(`Backend is healthy and running on port ${config.PORT}`);
      
      // Keep Render instance awake by self-pinging every 5 minutes
      const renderUrl = process.env.RENDER_EXTERNAL_URL || process.env.BACKEND_URL;
      if (renderUrl) {
        const FIVE_MINUTES = 5 * 60 * 1000;
        setInterval(async () => {
          try {
            const res = await fetch(`${renderUrl}/api/health`);
            console.log(`[Keep-Alive] Ping sent to ${renderUrl}/api/health - Status: ${res.status}`);
          } catch (err) {
            console.error('[Keep-Alive] Ping failed:', err);
          }
        }, FIVE_MINUTES);
      }
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

startServer();
