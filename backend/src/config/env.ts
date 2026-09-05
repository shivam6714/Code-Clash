import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/codeclash',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};
