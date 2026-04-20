// import Redis from 'ioredis';
// import { env } from './env';
// import { logger } from '../utils/logger';

// let redisClient: Redis | null = null;

// export const connectRedis = async (): Promise<Redis | null> => {
//   // Agar Redis URL nahi hai to skip karo
//   if (!env.REDIS_URL) {
//     logger.info('Redis not configured - running without realtime features');
//     return null;
//   }

//   try {
//     if (!redisClient) {
//       redisClient = new Redis(env.REDIS_URL, {
//         maxRetriesPerRequest: 1,
//         retryStrategy: () => null,
//         lazyConnect: true,
//       });

//       redisClient.on('error', (err) => {
//         logger.warn('Redis connection error (ignored):', err.message);
//       });
//     }

//     await redisClient.connect();
//     logger.info('Redis connected successfully');
//     return redisClient;
//   } catch (error: any) {
//     logger.warn(`Redis connection failed: ${error.message}`);
//     logger.info('Continuing without Redis - realtime features disabled');
//     return null;
//   }
// };

// export const getRedis = (): Redis | null => {
//   return redisClient;
// };

// export const closeRedis = async (): Promise<void> => {
//   if (redisClient) {
//     try {
//       await redisClient.quit();
//     } catch (error) {
//       // Ignore
//     }
//     redisClient = null;
//     logger.info('Redis connection closed');
//   }
// };

import { logger } from '../utils/logger';

// Since we are not using Redis for now, we'll create dummy functions

export const connectRedis = async (): Promise<null> => {
  logger.info('Redis not configured - running without realtime features');
  return null;
};

export const getRedis = (): null => {
  return null;
};

export const closeRedis = async (): Promise<void> => {
  // Nothing to close
};