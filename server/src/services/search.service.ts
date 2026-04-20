import { SearchRepository } from '../repositories/search.repository';

export class SearchService {
  static async globalSearch(query: string, type: string = 'all', page = 1, limit = 20) {
    return SearchRepository.globalSearch(query, type, page, limit);
  }
}