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
      origin: (origin, callback) => {
        callback(null, true);
      },
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Authentication Middleware
  io.use(async (socket, next) => {
    try {
      let token: string | undefined;

      // 1. Check handshake auth object (standard Socket.IO client auth)
      if (socket.handshake.auth && socket.handshake.auth.token) {
        token = socket.handshake.auth.token;
      }

      // 2. Check handshake headers authorization
      if (!token && socket.handshake.headers?.authorization) {
        const authHeader = socket.handshake.headers.authorization;
        token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
      }

      // 3. Check handshake query
      if (!token && socket.handshake.query && typeof socket.handshake.query.token === 'string') {
        token = socket.handshake.query.token;
      }

      // 4. Fallback to cookies
      if (!token && socket.request.headers.cookie) {
        const cookies = cookie.parse(socket.request.headers.cookie || '');
        token = cookies.token;
      }

      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
      
      const user = await User.findById(decoded.id).select('username rating');
      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }

      // Attach user info to socket
      (socket as any).userId = decoded.id;
      (socket as any).username = user.username;
      (socket as any).rating = user.rating ?? 300;
      
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
