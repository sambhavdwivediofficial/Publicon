import { Server } from 'socket.io';
import { RoomManager } from '../rooms';
import { logger } from '../../utils/logger';

export interface ShareEventData {
  targetType: string;
  targetId: string;
  newCount: number;
}

export const handleShareEvent = (io: Server, data: ShareEventData) => {
  const room = RoomManager.getContentRoomName(data.targetType, data.targetId);
  io.to(room).emit('share_updated', {
    targetType: data.targetType,
    targetId: data.targetId,
    newCount: data.newCount,
  });
  logger.debug(`Share event emitted to room: ${room}`);
};