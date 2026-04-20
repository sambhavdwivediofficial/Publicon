import { SearchRepository } from '../repositories/search.repository';
import { CacheManager } from '../utils/cacheManager';

export class ExploreService {
  static async search(query: string, includeAI = true, page = 1, limit = 10) {
    const cacheKey = `explore:search:${query}:${page}:${limit}`;
    const cached = await CacheManager.get(cacheKey);
    if (cached) return cached;

    // Perform search across questions, posts, communities
    const results = await SearchRepository.globalSearch(query, 'all', page, limit);

    // Optionally add AI-generated answer snippet
    if (includeAI) {
      // Integrate AI service here
    }

    await CacheManager.set(cacheKey, results, 300); // 5 min
    return results;
  }

  static async getTopic(slug: string) {
    // Fetch topic details, related questions, etc.
    return { slug, name: slug, description: '', related: [] };
  }

  static async getRelatedTopics(slug: string) {
    return [];
  }
}