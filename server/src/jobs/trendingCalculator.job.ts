import cron from 'node-cron';
import { getSupabase } from '../config/supabase';
import { logger } from '../utils/logger';
import { CacheManager } from '../utils/cacheManager';

// Runs every 15 minutes
export const startTrendingCalculatorJob = (): void => {
  cron.schedule('*/15 * * * *', async () => {
    logger.info('Starting trending calculator job...');
    const supabase = getSupabase();

    try {
      // Calculate trending score for questions based on:
      // - Recent votes
      // - Recent answers
      // - Views
      // - Time decay

      const { error } = await supabase.rpc('calculate_trending_scores');
      if (error) {
        logger.error('Trending calculation failed:', error);
        return;
      }

      // Clear trending caches
      await CacheManager.delPattern('insight:trending:*');
      await CacheManager.delPattern('explore:*');

      logger.info('Trending scores updated successfully');
    } catch (err) {
      logger.error('Trending job error:', err);
    }
  });
};