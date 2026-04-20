import { PostRepository } from '../repositories/post.repository';
import { CommunityRepository } from '../repositories/community.repository';
import { AppError } from '../middleware/errorHandler';

export class PostService {
  static async createPost(data: {
    title: string;
    body?: string;
    authorId: string;
    communityId: string;
    mediaIds?: string[];
  }) {
    const community = await CommunityRepository.findById(data.communityId);
    if (!community) throw new AppError('Community not found', 404);

    const post = await PostRepository.create({
      title: data.title,
      body: data.body || null,
      author_id: data.authorId,
      community_id: data.communityId,
      media_ids: data.mediaIds || null,
    });

    return post;
  }

  static async getPost(id: string) {
    const post = await PostRepository.findById(id);
    if (!post) throw new AppError('Post not found', 404);
    return post;
  }

  static async listPosts(options: {
    page?: number;
    limit?: number;
    sort?: string;
    communityId?: string;
    userId?: string;
  }) {
    return PostRepository.list(options);
  }

  static async updatePost(
    id: string,
    authorId: string,
    updates: { title?: string; body?: string; mediaIds?: string[] }
  ) {
    const post = await PostRepository.findById(id);
    if (!post) throw new AppError('Post not found', 404);
    if (post.author_id !== authorId) throw new AppError('Forbidden', 403);

    const dbUpdates: any = {};
    if (updates.title) dbUpdates.title = updates.title;
    if (updates.body !== undefined) dbUpdates.body = updates.body;
    if (updates.mediaIds) dbUpdates.media_ids = updates.mediaIds;

    return PostRepository.update(id, dbUpdates);
  }

  static async deletePost(id: string, authorId: string) {
    const post = await PostRepository.findById(id);
    if (!post) throw new AppError('Post not found', 404);
    if (post.author_id !== authorId) throw new AppError('Forbidden', 403);
    return PostRepository.delete(id);
  }
}