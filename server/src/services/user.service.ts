import { UserRepository } from '../repositories/user.repository';
import { FollowRepository } from '../repositories/follow.repository';
import { AppError } from '../middleware/errorHandler';
import { User, UserProfile } from '../types';

export class UserService {
  static async getProfile(userId: string, currentUserId?: string): Promise<UserProfile> {
    const user = await UserRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    const followersCount = await FollowRepository.getFollowersCount(userId);
    const followingCount = await FollowRepository.getFollowingCount(userId);
    let isFollowing = false;
    if (currentUserId) {
      isFollowing = await FollowRepository.isFollowing(currentUserId, userId);
    }

    return {
      ...user,
      followersCount,
      followingCount,
      isFollowing,
    };
  }

  static async getProfileByUsername(username: string, currentUserId?: string) {
    const user = await UserRepository.findByUsername(username);
    if (!user) throw new AppError('User not found', 404);
    return this.getProfile(user.id, currentUserId);
  }

  static async updateProfile(userId: string, updates: Partial<User>) {
    const allowed = ['name', 'username', 'bio', 'location', 'website'];
    const filtered: any = {};
    for (const key of allowed) {
      if (updates[key] !== undefined) filtered[key] = updates[key];
    }

    if (filtered.username) {
      const existing = await UserRepository.findByUsername(filtered.username);
      if (existing && existing.id !== userId) {
        throw new AppError('Username already taken', 400);
      }
    }

    // Map to DB column names
    const dbUpdates: any = {};
    if (filtered.name) dbUpdates.name = filtered.name;
    if (filtered.username) dbUpdates.username = filtered.username;
    if (filtered.bio) dbUpdates.bio = filtered.bio;
    if (filtered.location) dbUpdates.location = filtered.location;
    if (filtered.website) dbUpdates.website = filtered.website;

    return UserRepository.update(userId, dbUpdates);
  }

  static async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) throw new AppError('Cannot follow yourself', 400);
    const already = await FollowRepository.isFollowing(followerId, followingId);
    if (already) throw new AppError('Already following', 400);
    return FollowRepository.follow(followerId, followingId);
  }

  static async unfollowUser(followerId: string, followingId: string) {
    const isFollowing = await FollowRepository.isFollowing(followerId, followingId);
    if (!isFollowing) throw new AppError('Not following', 400);
    return FollowRepository.unfollow(followerId, followingId);
  }

  static async getFollowers(userId: string, page = 1, limit = 20) {
    // Implementation would join follows with users
    // For brevity, returning empty structure; you can expand
    return { data: [], total: 0 };
  }

  static async getFollowing(userId: string, page = 1, limit = 20) {
    return { data: [], total: 0 };
  }
}