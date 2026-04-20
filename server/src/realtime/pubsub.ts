// import { Server } from 'socket.io';
// import { getRedis } from '../config/redis';
// import { logger } from '../utils/logger';

// let subscriber: any = null;

// export const setupPubSub = (io: Server) => {
//   const redis = getRedis();
  
//   if (!redis) {
//     logger.warn('Redis not available - pub/sub disabled');
//     return;
//   }

//   try {
//     subscriber = redis.duplicate();

//     subscriber.on('message', (channel: string, message: string) => {
//       try {
//         const data = JSON.parse(message);
//         // Handlers would go here
//       } catch (error) {
//         logger.error('Error processing pub/sub message:', error);
//       }
//     });

//     subscriber.subscribe('like', 'share', 'follow', 'comment', 'notification');
//     logger.info('Redis pub/sub subscribed to channels');
//   } catch (error: any) {
//     logger.warn(`Pub/sub setup failed: ${error.message}`);
//   }
// };

// export const publishEvent = async (channel: string, data: any) => {
//   const redis = getRedis();
//   if (!redis) return;
  
//   try {
//     await redis.publish(channel, JSON.stringify(data));
//   } catch (error) {
//     // Ignore publish errors
//   }
// };

import { Server } from 'socket.io';
import { logger } from '../utils/logger';

export const setupPubSub = (io: Server) => {
  logger.info('Pub/Sub disabled (Redis not configured)');
};

export const publishEvent = async (channel: string, data: any) => {
  // Do nothing
};