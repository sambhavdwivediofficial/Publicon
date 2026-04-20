import { Server } from 'socket.io';
import { RoomManager } from '../rooms';
import { logger } from '../../utils/logger';

export interface NotificationEventData {
  userId: string;
  notification: any; // Full notification object
}

export const handleNotificationEvent = (io: Server, data: NotificationEventData) => {
  const room = RoomManager.getUserRoomName(data.userId);
  io.to(room).emit('notification', data.notification);
  logger.debug(`Notification event emitted to user: ${data.userId}`);
};