import { QuestionRepository } from '../repositories/question.repository';
import { TagRepository } from '../repositories/tag.repository';
import { AppError } from '../middleware/errorHandler';
import { Question } from '../types';

export class QuestionService {
  static async createQuestion(data: {
    title: string;
    body: string;
    authorId: string;
    tags: string[];
    communityId?: string;
    isAnonymous?: boolean;
  }) {
    // Process tags: find or create
    const tagRecords = await Promise.all(
      data.tags.map(tag => TagRepository.findOrCreate(tag))
    );

    const question = await QuestionRepository.create({
      title: data.title,
      body: data.body,
      author_id: data.authorId,
      community_id: data.communityId || null,
      is_anonymous: data.isAnonymous || false,
      tags: tagRecords.map(t => t.name),
    });

    return question;
  }

  static async getQuestion(id: string, viewerId?: string) {
    const question = await QuestionRepository.findById(id);
    if (!question) throw new AppError('Question not found', 404);
    await QuestionRepository.incrementViews(id);
    return question;
  }

  static async listQuestions(options: {
    page?: number;
    limit?: number;
    sort?: string;
    tag?: string;
    communityId?: string;
  }) {
    return QuestionRepository.list(options);
  }

  static async updateQuestion(
    id: string,
    authorId: string,
    updates: { title?: string; body?: string; tags?: string[] }
  ) {
    const question = await QuestionRepository.findById(id);
    if (!question) throw new AppError('Question not found', 404);
    if (question.author_id !== authorId) throw new AppError('Forbidden', 403);

    const dbUpdates: any = {};
    if (updates.title) dbUpdates.title = updates.title;
    if (updates.body) dbUpdates.body = updates.body;
    if (updates.tags) {
      const tagRecords = await Promise.all(
        updates.tags.map(tag => TagRepository.findOrCreate(tag))
      );
      dbUpdates.tags = tagRecords.map(t => t.name);
    }

    return QuestionRepository.update(id, dbUpdates);
  }

  static async deleteQuestion(id: string, authorId: string) {
    const question = await QuestionRepository.findById(id);
    if (!question) throw new AppError('Question not found', 404);
    if (question.author_id !== authorId) throw new AppError('Forbidden', 403);
    return QuestionRepository.delete(id);
  }
}