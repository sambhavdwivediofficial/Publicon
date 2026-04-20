import { LikeRepository } from '../repositories/like.repository';
import { AppError } from '../middleware/errorHandler';
import { getIO } from '../realtime/realtimeServer';

export class LikeService {
  static async like(userId: string, targetType: string, targetId: string) {
    const already = await LikeRepository.hasLiked(userId, targetType, targetId);
    if (already) throw new AppError('Already liked', 400);

    await LikeRepository.like(userId, targetType, targetId);
    const count = await LikeRepository.getLikesCount(targetType, targetId);

    // Emit real-time event
    const io = getIO();
    io.to(`${targetType}:${targetId}`).emit('like_updated', {
      targetType,
      targetId,
      newCount: count,
      userId,
    });

    return { liked: true, count };
  }

  static async unlike(userId: string, targetType: string, targetId: string) {
    const hasLiked = await LikeRepository.hasLiked(userId, targetType, targetId);
    if (!hasLiked) throw new AppError('Not liked', 400);

    await LikeRepository.unlike(userId, targetType, targetId);
    const count = await LikeRepository.getLikesCount(targetType, targetId);

    const io = getIO();
    io.to(`${targetType}:${targetId}`).emit('like_updated', {
      targetType,
      targetId,
      newCount: count,
      userId,
    });

    return { liked: false, count };
  }

  static async getLikeStatus(userId: string, targetType: string, targetId: string) {
    const liked = await LikeRepository.hasLiked(userId, targetType, targetId);
    const count = await LikeRepository.getLikesCount(targetType, targetId);
    return { liked, count };
  }
}