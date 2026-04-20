import { createServer } from 'http';
import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';
import { initializeRealtimeServer } from './realtime/realtimeServer';
import { connectRedis, closeRedis } from './config/redis';

const PORT = env.PORT;

const startServer = async () => {
  try {
    // ✅ Pehle Redis connect karo
    await connectRedis();
    
    const httpServer = createServer(app);
    
    // ✅ Phir Socket.io initialize karo
    initializeRealtimeServer(httpServer);

    httpServer.listen(PORT, () => {
      logger.info(`🚀 Publicon Server running on port ${PORT} in ${env.NODE_ENV} mode`);
      logger.info(`📡 WebSocket server available at ws://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  logger.info('Received shutdown signal, closing connections...');
  await closeRedis();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

startServer();