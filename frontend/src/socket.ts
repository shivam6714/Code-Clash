import { io, Socket } from 'socket.io-client';
import { getStoredToken } from './api/auth';

const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const socket: Socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
  auth: (cb) => {
    const token = getStoredToken();
    cb({ token });
  },
});
