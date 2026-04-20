import { AppError } from '../middleware/errorHandler';

export class FeedService {
  static async getPersonalizedFeed(userId: string, page = 1, limit = 20) {
    // अस्थायी खाली रिस्पॉन्स – बाद में असली फ़ीड एल्गोरिदम से बदलें
    return { data: [], total: 0 };
  }
}