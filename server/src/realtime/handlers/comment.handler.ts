import { Server } from 'socket.io';
import { RoomManager } from '../rooms';
import { logger } from '../../utils/logger';

export interface CommentEventData {
  targetType: string;
  targetId: string;
  comment: any; // Full comment object
}

export const handleCommentEvent = (io: Server, data: CommentEventData) => {
  const room = RoomManager.getContentRoomName(data.targetType, data.targetId);
  io.to(room).emit('new_comment', {
    targetType: data.targetType,
    targetId: data.targetId,
    comment: data.comment,
  });
  logger.debug(`Comment event emitted to room: ${room}`);
};