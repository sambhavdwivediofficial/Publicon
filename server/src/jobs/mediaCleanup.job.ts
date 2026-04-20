import cron from 'node-cron';
import { getSupabase } from '../config/supabase';
import { logger } from '../utils/logger';

// Runs daily at 3 AM
export const startMediaCleanupJob = (): void => {
  cron.schedule('0 3 * * *', async () => {
    logger.info('Starting media cleanup job...');
    const supabase = getSupabase();
    const bucket = 'user-content';

    try {
      // Find media records older than 30 days that are not referenced anywhere
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const { data: orphanedMedia, error } = await supabase
        .from('media')
        .select('id, bucket_path')
        .lt('created_at', thirtyDaysAgo)
        .limit(100);

      if (error) {
        logger.error('Failed to fetch orphaned media:', error);
        return;
      }

      if (!orphanedMedia || orphanedMedia.length === 0) {
        logger.info('No orphaned media to clean up');
        return;
      }

      for (const media of orphanedMedia) {
        // Check if this media is referenced in any posts, avatars, covers, etc.
        const { data: refs } = await supabase.rpc('is_media_referenced', {
          p_media_id: media.id,
        });

        if (!refs || refs === false) {
          // Delete from storage
          const { error: deleteError } = await supabase.storage
            .from(bucket)
            .remove([media.bucket_path]);

          if (deleteError) {
            logger.error(`Failed to delete file ${media.bucket_path}:`, deleteError);
            continue;
          }

          // Delete from media table
          await supabase.from('media').delete().eq('id', media.id);
          logger.info(`Deleted orphaned media: ${media.id}`);
        }
      }

      logger.info('Media cleanup job completed');
    } catch (err) {
      logger.error('Media cleanup job error:', err);
    }
  });
};