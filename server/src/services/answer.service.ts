import { AnswerRepository } from '../repositories/answer.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { AppError } from '../middleware/errorHandler';

export class AnswerService {
  static async createAnswer(data: {
    body: string;
    questionId: string;
    authorId: string;
    isAnonymous?: boolean;
    aiAssisted?: boolean;
  }) {
    const question = await QuestionRepository.findById(data.questionId);
    if (!question) throw new AppError('Question not found', 404);

    const answer = await AnswerRepository.create({
      body: data.body,
      question_id: data.questionId,
      author_id: data.authorId,
      is_anonymous: data.isAnonymous || false,
      ai_assisted: data.aiAssisted || false,
    });

    // Update question answer count
    await QuestionRepository.update(data.questionId, {
      answers_count: (question.answers_count || 0) + 1,
    });

    return answer;
  }

  static async getAnswer(id: string) {
    const answer = await AnswerRepository.findById(id);
    if (!answer) throw new AppError('Answer not found', 404);
    return answer;
  }

  static async listAnswersByQuestion(
    questionId: string,
    options: { page?: number; limit?: number; sort?: string }
  ) {
    return AnswerRepository.findByQuestionId(
      questionId,
      options.page,
      options.limit,
      options.sort
    );
  }

  static async updateAnswer(
    id: string,
    authorId: string,
    updates: { body: string }
  ) {
    const answer = await AnswerRepository.findById(id);
    if (!answer) throw new AppError('Answer not found', 404);
    if (answer.author_id !== authorId) throw new AppError('Forbidden', 403);
    return AnswerRepository.update(id, { body: updates.body });
  }

  static async deleteAnswer(id: string, authorId: string) {
    const answer = await AnswerRepository.findById(id);
    if (!answer) throw new AppError('Answer not found', 404);
    if (answer.author_id !== authorId) throw new AppError('Forbidden', 403);

    await AnswerRepository.delete(id);
    // Decrement question answer count
    const question = await QuestionRepository.findById(answer.question_id);
    if (question) {
      await QuestionRepository.update(answer.question_id, {
        answers_count: Math.max(0, (question.answers_count || 0) - 1),
      });
    }
    return true;
  }
}