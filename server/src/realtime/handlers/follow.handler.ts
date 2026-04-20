import { Server } from 'socket.io';
import { RoomManager } from '../rooms';
import { logger } from '../../utils/logger';

export interface FollowEventData {
  followingId: string;
  newCount: number;
}

export const handleFollowEvent = (io: Server, data: FollowEventData) => {
  const room = RoomManager.getUserRoomName(data.followingId);
  io.to(room).emit('follower_count_updated', {
    userId: data.followingId,
    newCount: data.newCount,
  });
  logger.debug(`Follow event emitted to room: ${room}`);
};