import { CommentRepository } from '../repositories/comment.repository';
import { AppError } from '../middleware/errorHandler';

export class CommentService {
  static async createComment(data: {
    body: string;
    targetType: string;
    targetId: string;
    authorId: string;
    parentId?: string;
  }) {
    // Validate target exists? Optional depending on target type
    const comment = await CommentRepository.create({
      body: data.body,
      target_type: data.targetType,
      target_id: data.targetId,
      author_id: data.authorId,
      parent_id: data.parentId || null,
    });
    return comment;
  }

  static async getComments(options: {
    targetType: string;
    targetId: string;
    page?: number;
    limit?: number;
    sort?: string;
  }) {
    return CommentRepository.findByTarget(
      options.targetType,
      options.targetId,
      options.page,
      options.limit,
      options.sort
    );
  }

  static async getReplies(parentId: string) {
    return CommentRepository.findReplies(parentId);
  }

  static async updateComment(id: string, authorId: string, body: string) {
    const comment = await CommentRepository.update(id, { body });
    // Could add auth check: if comment.author_id !== authorId throw error
    return comment;
  }

  static async deleteComment(id: string, authorId: string) {
    // Add auth check
    await CommentRepository.delete(id);
    return true;
  }
}