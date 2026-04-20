import { MediaRepository } from '../repositories/media.repository';
import { AppError } from '../middleware/errorHandler';
import { getSupabase } from '../config/supabase';
import { env } from '../config/env';
import jwt from 'jsonwebtoken';

export class MediaService {
  static async uploadFile(file: Express.Multer.File, userId: string, type: string) {
    const supabase = getSupabase();
    const bucket = 'user-content';
    const path = `${userId}/${Date.now()}_${file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) throw new AppError('Upload failed', 500);

    // Save media metadata
    const media = await MediaRepository.create({
      user_id: userId,
      bucket_path: path,
      file_name: file.originalname,
      mime_type: file.mimetype,
      size: file.size,
    });

    return { mediaId: media.id };
  }

  static generateMediaToken(mediaId: string, userId: string) {
    return jwt.sign(
      { mediaId, userId },
      env.MEDIA_CDN_SECRET,
      { expiresIn: env.MEDIA_SIGNED_TOKEN_EXPIRES }
    );
  }

  static verifyMediaToken(token: string): { mediaId: string; userId: string } | null {
    try {
      return jwt.verify(token, env.MEDIA_CDN_SECRET) as any;
    } catch {
      return null;
    }
  }

  static async getMediaStream(mediaId: string) {
    const media = await MediaRepository.findById(mediaId);
    if (!media) throw new AppError('Media not found', 404);

    const supabase = getSupabase();
    const { data, error } = await supabase.storage
      .from('user-content')
      .download(media.bucket_path);

    if (error) throw new AppError('File not found', 404);
    return { stream: data, mimeType: media.mime_type };
  }
}