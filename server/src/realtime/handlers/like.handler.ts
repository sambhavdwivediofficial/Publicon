import { Server } from 'socket.io';
import { RoomManager } from '../rooms';
import { logger } from '../../utils/logger';

export interface LikeEventData {
  targetType: string;
  targetId: string;
  newCount: number;
  userId: string;
}

export const handleLikeEvent = (io: Server, data: LikeEventData) => {
  const room = RoomManager.getContentRoomName(data.targetType, data.targetId);
  io.to(room).emit('like_updated', {
    targetType: data.targetType,
    targetId: data.targetId,
    newCount: data.newCount,
    userId: data.userId,
  });
  logger.debug(`Like event emitted to room: ${room}`);
};