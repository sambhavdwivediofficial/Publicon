import cron from 'node-cron';
import { getSupabase } from '../config/supabase';
import { logger } from '../utils/logger';
import { env } from '../config/env';

// Runs daily at 9 AM
export const startNotificationDigestJob = (): void => {
  cron.schedule('0 9 * * *', async () => {
    logger.info('Starting notification digest job...');
    const supabase = getSupabase();

    try {
      // Get users who have unread notifications in last 24h and want digest emails
      const { data: users, error } = await supabase
        .from('users')
        .select('id, email, name')
        .eq('email_digest_enabled', true);

      if (error) {
        logger.error('Failed to fetch users for digest:', error);
        return;
      }

      if (!users || users.length === 0) {
        logger.info('No users for digest');
        return;
      }

      for (const user of users) {
        // Count unread notifications
        const { count } = await supabase
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('is_read', false)
          .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

        if (count && count > 0) {
          // TODO: Send email via email service (Resend/SendGrid)
          logger.info(`User ${user.email} has ${count} unread notifications`);
          // emailService.sendDigest(user.email, count);
        }
      }

      logger.info('Notification digest job completed');
    } catch (err) {
      logger.error('Notification digest job error:', err);
    }
  });
};