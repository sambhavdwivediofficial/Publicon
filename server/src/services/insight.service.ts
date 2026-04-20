import { QuestionRepository } from '../repositories/question.repository';
import { AnswerRepository } from '../repositories/answer.repository';
import { CacheManager } from '../utils/cacheManager';

export class InsightService {
  static async getTrending(limit = 20) {
    const cacheKey = `insight:trending:${limit}`;
    const cached = await CacheManager.get(cacheKey);
    if (cached) return cached;

    const { data } = await QuestionRepository.list({
      sort: 'trending',
      limit,
      page: 1,
    });
    await CacheManager.set(cacheKey, data, 600); // 10 min
    return data;
  }

  static async getTopAnswers(limit = 20) {
    // Fetch highest voted answers recently
    // Placeholder
    return [];
  }
}