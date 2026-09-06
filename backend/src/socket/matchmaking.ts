import { Server, Socket } from 'socket.io';
import { BattlePlayer } from './types';
import { createBattle, userBattles } from './battle';

interface QueueEntry {
  userId: string;
  username: string;
  socketId: string;
  rating: number;
}

const matchmakingQueue: QueueEntry[] = [];
const userSockets = new Map<string, string>(); // userId -> socketId to prevent duplicates

export const handleMatchmaking = (io: Server, socket: Socket) => {
  const userId = (socket as any).userId;
  const username = (socket as any).username;
  const rating = (socket as any).rating ?? 300;

  socket.on('matchmaking:join', () => {
    // Prevent joining if already in a battle
    if (userBattles.has(userId)) {
      return socket.emit('error', { message: 'Already in a battle' });
    }

    // Prevent joining if already in queue
    if (userSockets.has(userId)) {
      return socket.emit('error', { message: 'Already in queue' });
    }

    userSockets.set(userId, socket.id);
    
    const entry: QueueEntry = { userId, username, socketId: socket.id, rating };
    socket.emit('matchmaking:queued', { message: 'Searching for opponent...' });
    
    // Check if someone else is in the queue
    if (matchmakingQueue.length > 0) {
      const opponent = matchmakingQueue.shift()!;
      userSockets.delete(opponent.userId);
      userSockets.delete(userId);
      
      const player1: BattlePlayer = { ...opponent, hasSubmitted: false, connected: true };
      const player2: BattlePlayer = { ...entry, hasSubmitted: false, connected: true };
      
      io.to(player1.socketId).emit('matchmaking:found');
      io.to(player2.socketId).emit('matchmaking:found');
      
      createBattle(io, player1, player2);
    } else {
      matchmakingQueue.push(entry);
      socket.emit('matchmaking:searching');
    }
  });

  socket.on('matchmaking:leave', () => {
    removeUserFromQueue(userId);
    socket.emit('matchmaking:idle');
  });
};

export const removeUserFromQueue = (userId: string) => {
  const index = matchmakingQueue.findIndex(q => q.userId === userId);
  if (index !== -1) {
    matchmakingQueue.splice(index, 1);
  }
  userSockets.delete(userId);
};
