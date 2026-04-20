import { Socket } from 'socket.io';

export class RoomManager {
  static async joinUserRoom(socket: Socket, userId: string): Promise<void> {
    await socket.join(`user:${userId}`);
  }

  static async joinContentRoom(socket: Socket, targetType: string, targetId: string): Promise<void> {
    await socket.join(`${targetType}:${targetId}`);
  }

  static async leaveContentRoom(socket: Socket, targetType: string, targetId: string): Promise<void> {
    await socket.leave(`${targetType}:${targetId}`);
  }

  static getContentRoomName(targetType: string, targetId: string): string {
    return `${targetType}:${targetId}`;
  }

  static getUserRoomName(userId: string): string {
    return `user:${userId}`;
  }
}