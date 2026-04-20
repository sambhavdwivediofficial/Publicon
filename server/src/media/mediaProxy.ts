import { Response } from 'express';
import { getSupabase } from '../config/supabase';
import { MediaRepository } from '../repositories/media.repository';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const streamMediaToResponse = async (
  mediaId: string,
  res: Response
): Promise<void> => {
  try {
    // Fetch media metadata
    const media = await MediaRepository.findById(mediaId);
    if (!media) {
      throw new AppError('Media not found', 404);
    }

    const supabase = getSupabase();
    const bucket = 'user-content';

    // Download file from Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(media.bucket_path);

    if (error || !data) {
      logger.error('Media download error:', error);
      throw new AppError('File not found in storage', 404);
    }

    // Set appropriate headers
    res.setHeader('Content-Type', media.mime_type);
    res.setHeader('Content-Length', media.size);
    res.setHeader('Cache-Control', 'private, max-age=31536000'); // 1 year
    res.setHeader('Content-Disposition', 'inline');
    
    // Security headers to prevent download/right-click saving (additional layer)
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', "default-src 'none'; img-src 'self'; media-src 'self'");

    // Convert blob to buffer and stream
    const buffer = Buffer.from(await data.arrayBuffer());
    res.end(buffer);
  } catch (error) {
    logger.error('Media proxy error:', error);
    throw error;
  }
};