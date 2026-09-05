import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { handleMatchmaking } from './matchmaking';
import { handleBattleEvents, handleDisconnect } from './battle';
import { User } from '../models/User';

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: config.FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Authentication Middleware
  io.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.request.headers.cookie || '');
      const token = cookies.token;

      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
      
      const user = await User.findById(decoded.id).select('username');
      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }

      // Attach user info to socket
      (socket as any).userId = decoded.id;
      (socket as any).username = user.username;
      
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id} (User: ${(socket as any).username})`);

    handleMatchmaking(io, socket);
    handleBattleEvents(io, socket);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
      handleDisconnect(io, socket);
    });
  });

  return io;
};
