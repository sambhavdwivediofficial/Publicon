import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { env } from '../config/env';
import { verifySessionToken } from '../utils/jwtManager';
import { logger } from '../utils/logger';
import { getRedis } from '../config/redis';
import { setupPubSub } from './pubsub';
import { RoomManager } from './rooms';

let io: Server;

export const initializeRealtimeServer = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true,
    },
    path: '/ws',
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const payload = verifySessionToken(token);
      if (!payload) {
        return next(new Error('Invalid or expired token'));
      }

      socket.data.user = payload;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', async (socket: Socket) => {
    const userId = socket.data.user.userId;
    logger.info(`WebSocket client connected: ${socket.id}, user: ${userId}`);

    // Join personal room
    await RoomManager.joinUserRoom(socket, userId);

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`WebSocket client disconnected: ${socket.id}`);
    });

    // Handle explicit room join requests (for content rooms)
    socket.on('join:room', async (room: string) => {
      await socket.join(room);
      logger.debug(`Socket ${socket.id} joined room: ${room}`);
    });

    socket.on('leave:room', async (room: string) => {
      await socket.leave(room);
      logger.debug(`Socket ${socket.id} left room: ${room}`);
    });
  });

  // Setup Redis pub/sub for horizontal scaling
  setupPubSub(io);

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized. Call initializeRealtimeServer first.');
  }
  return io;
};