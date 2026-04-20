import { TagRepository } from '../repositories/tag.repository';

export class TagService {
  static async listTags() {
    return TagRepository.list();
  }

  static async suggestTags(query: string) {
    return TagRepository.suggest(query);
  }

  static async getTag(slug: string) {
    // Find tag by slug, return related content
    return { slug };
  }
}