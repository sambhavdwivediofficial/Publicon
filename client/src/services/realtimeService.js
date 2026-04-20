import { io } from 'socket.io-client';
import { tokenManager } from '../utils/tokenManager';

let socket = null;

export const realtimeService = {
  connect: (token) => {
    if (socket) return socket;
    socket = io(import.meta.env.VITE_WS_URL, {
      auth: { token },
      path: '/ws',
      transports: ['websocket'],
    });
    return socket;
  },
  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },
  on: (event, callback) => socket?.on(event, callback),
  off: (event, callback) => socket?.off(event, callback),
  emit: (event, data) => socket?.emit(event, data),
};