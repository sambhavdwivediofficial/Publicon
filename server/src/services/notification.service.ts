import { NotificationRepository } from '../repositories/notification.repository';
import { getIO } from '../realtime/realtimeServer';

export class NotificationService {
  static async createNotification(data: {
    userId: string;
    type: string;
    actorId?: string;
    targetType?: string;
    targetId?: string;
    message: string;
  }) {
    const notification = await NotificationRepository.create({
      user_id: data.userId,
      type: data.type,
      actor_id: data.actorId || null,
      target_type: data.targetType || null,
      target_id: data.targetId || null,
      message: data.message,
      is_read: false,
    });

    // Emit real-time notification
    const io = getIO();
    io.to(`user:${data.userId}`).emit('notification', notification);

    return notification;
  }

  static async getUserNotifications(userId: string, page = 1, limit = 20, unreadOnly = false) {
    return NotificationRepository.findByUser(userId, page, limit, unreadOnly);
  }

  static async markAsRead(id: string, userId: string) {
    // Verify ownership (optional)
    await NotificationRepository.markAsRead(id);
  }

  static async markAllAsRead(userId: string) {
    await NotificationRepository.markAllAsRead(userId);
  }
}