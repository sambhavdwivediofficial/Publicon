import { FollowRepository } from '../repositories/follow.repository';
import { AppError } from '../middleware/errorHandler';
import { getIO } from '../realtime/realtimeServer';
import { NotificationService } from './notification.service';

export class FollowService {
  static async follow(followerId: string, followingId: string) {
    if (followerId === followingId) throw new AppError('Cannot follow yourself', 400);
    const already = await FollowRepository.isFollowing(followerId, followingId);
    if (already) throw new AppError('Already following', 400);

    await FollowRepository.follow(followerId, followingId);
    const count = await FollowRepository.getFollowersCount(followingId);

    // Emit real-time
    const io = getIO();
    io.to(`user:${followingId}`).emit('follower_count_updated', {
      userId: followingId,
      newCount: count,
    });

    // Create notification
    await NotificationService.createNotification({
      userId: followingId,
      type: 'follow',
      actorId: followerId,
      message: 'started following you',
    });

    return { following: true, count };
  }

  static async unfollow(followerId: string, followingId: string) {
    const isFollowing = await FollowRepository.isFollowing(followerId, followingId);
    if (!isFollowing) throw new AppError('Not following', 400);

    await FollowRepository.unfollow(followerId, followingId);
    const count = await FollowRepository.getFollowersCount(followingId);

    const io = getIO();
    io.to(`user:${followingId}`).emit('follower_count_updated', {
      userId: followingId,
      newCount: count,
    });

    return { following: false, count };
  }

  static async getFollowStatus(followerId: string, followingId: string) {
    const isFollowing = await FollowRepository.isFollowing(followerId, followingId);
    const followersCount = await FollowRepository.getFollowersCount(followingId);
    const followingCount = await FollowRepository.getFollowingCount(followingId);
    return { isFollowing, followersCount, followingCount };
  }
}