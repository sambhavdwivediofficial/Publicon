import { CommunityRepository } from '../repositories/community.repository';
import { AppError } from '../middleware/errorHandler';
import { slugify } from '../utils/slugify';

export class CommunityService {
  static async createCommunity(data: {
    name: string;
    slug: string;
    description: string;
    createdBy: string;
    avatarUrl?: string;
    coverUrl?: string;
    isPrivate?: boolean;
    rules?: string[];
    tags?: string[];
  }) {
    // Check slug uniqueness
    const existing = await CommunityRepository.findBySlug(data.slug);
    if (existing) throw new AppError('Community slug already exists', 400);

    const community = await CommunityRepository.create({
      name: data.name,
      slug: data.slug,
      description: data.description,
      created_by: data.createdBy,
      avatar_url: data.avatarUrl || null,
      cover_url: data.coverUrl || null,
      is_private: data.isPrivate || false,
      rules: data.rules || null,
      tags: data.tags || null,
    });

    // Add creator as admin member (optional, handle in separate service)

    return community;
  }

  static async getCommunity(slug: string) {
    const community = await CommunityRepository.findBySlug(slug);
    if (!community) throw new AppError('Community not found', 404);
    return community;
  }

  static async listCommunities(options: {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
  }) {
    return CommunityRepository.list(options);
  }

  static async updateCommunity(
    id: string,
    userId: string,
    updates: Partial<{
      name: string;
      description: string;
      avatarUrl: string;
      coverUrl: string;
      isPrivate: boolean;
      rules: string[];
      tags: string[];
    }>
  ) {
    const community = await CommunityRepository.findById(id);
    if (!community) throw new AppError('Community not found', 404);
    if (community.created_by !== userId) throw new AppError('Forbidden', 403);

    const dbUpdates: any = {};
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.avatarUrl !== undefined) dbUpdates.avatar_url = updates.avatarUrl;
    if (updates.coverUrl !== undefined) dbUpdates.cover_url = updates.coverUrl;
    if (updates.isPrivate !== undefined) dbUpdates.is_private = updates.isPrivate;
    if (updates.rules) dbUpdates.rules = updates.rules;
    if (updates.tags) dbUpdates.tags = updates.tags;

    return CommunityRepository.update(id, dbUpdates);
  }

  static async deleteCommunity(id: string, userId: string) {
    const community = await CommunityRepository.findById(id);
    if (!community) throw new AppError('Community not found', 404);
    if (community.created_by !== userId) throw new AppError('Forbidden', 403);
    return CommunityRepository.delete(id);
  }

  static async joinCommunity(communityId: string, userId: string) {
    // Implementation depends on community_members table
    // For now, just increment member count
    await CommunityRepository.incrementMembers(communityId, 1);
    return true;
  }

  static async leaveCommunity(communityId: string, userId: string) {
    await CommunityRepository.incrementMembers(communityId, -1);
    return true;
  }
}