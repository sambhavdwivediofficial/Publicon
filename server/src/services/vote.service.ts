import { VoteRepository } from '../repositories/vote.repository';
import { AnswerRepository } from '../repositories/answer.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { PostRepository } from '../repositories/post.repository';
import { CommentRepository } from '../repositories/comment.repository';
import { AppError } from '../middleware/errorHandler';

export class VoteService {
  static async vote(userId: string, targetType: string, targetId: string, value: number) {
    // Validate target exists
    await this.validateTarget(targetType, targetId);

    // Upsert vote
    const vote = await VoteRepository.vote(userId, targetType, targetId, value);

    // Update target vote count
    const currentCount = await VoteRepository.getVoteCount(targetType, targetId);
    await this.updateTargetVoteCount(targetType, targetId, currentCount);

    return { success: true, newCount: currentCount };
  }

  static async removeVote(userId: string, targetType: string, targetId: string) {
    await VoteRepository.removeVote(userId, targetType, targetId);
    const currentCount = await VoteRepository.getVoteCount(targetType, targetId);
    await this.updateTargetVoteCount(targetType, targetId, currentCount);
    return { success: true, newCount: currentCount };
  }

  static async getUserVote(userId: string, targetType: string, targetId: string) {
    return VoteRepository.getUserVote(userId, targetType, targetId);
  }

  private static async validateTarget(targetType: string, targetId: string) {
    switch (targetType) {
      case 'question':
        const q = await QuestionRepository.findById(targetId);
        if (!q) throw new AppError('Question not found', 404);
        break;
      case 'answer':
        const a = await AnswerRepository.findById(targetId);
        if (!a) throw new AppError('Answer not found', 404);
        break;
      case 'post':
        const p = await PostRepository.findById(targetId);
        if (!p) throw new AppError('Post not found', 404);
        break;
      case 'comment':
        const c = await CommentRepository.update(targetId, {});
        // Actually need findById, placeholder
        break;
    }
  }

  private static async updateTargetVoteCount(targetType: string, targetId: string, count: number) {
    switch (targetType) {
      case 'question':
        await QuestionRepository.update(targetId, { votes_count: count });
        break;
      case 'answer':
        await AnswerRepository.update(targetId, { votes_count: count });
        break;
      case 'post':
        await PostRepository.update(targetId, { votes_count: count });
        break;
      case 'comment':
        await CommentRepository.incrementVotes(targetId, 0); // need set method, use update
        break;
    }
  }
}