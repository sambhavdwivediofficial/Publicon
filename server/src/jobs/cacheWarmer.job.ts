import cron from 'node-cron';
import { logger } from '../utils/logger';
import { CacheManager } from '../utils/cacheManager';
import { QuestionRepository } from '../repositories/question.repository';
import { CommunityRepository } from '../repositories/community.repository';

// Runs every 30 minutes
export const startCacheWarmerJob = (): void => {
  cron.schedule('*/30 * * * *', async () => {
    logger.info('Starting cache warmer job...');

    try {
      // Pre-warm trending questions
      const trending = await QuestionRepository.list({
        sort: 'trending',
        limit: 50,
        page: 1,
      });
      await CacheManager.set('insight:trending:50', trending.data, 3600);

      // Pre-warm popular communities
      const communities = await CommunityRepository.list({
        sort: 'popular',
        limit: 20,
        page: 1,
      });
      await CacheManager.set('communities:popular:20', communities.data, 3600);

      logger.info('Cache warmed successfully');
    } catch (err) {
      logger.error('Cache warmer job error:', err);
    }
  });
};