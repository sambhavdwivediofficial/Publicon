import { getSupabase } from '../config/supabase';
import { MediaRepository } from '../repositories/media.repository';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

interface UploadResult {
  mediaId: string;
  url?: string; // Not exposed to client, just for internal use
}

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/webm',
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const handleUpload = async (
  file: Express.Multer.File,
  userId: string,
  type: 'avatar' | 'cover' | 'post' | 'community'
): Promise<UploadResult> => {
  // Validate file
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new AppError('File type not allowed', 400);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new AppError('File too large (max 50MB)', 400);
  }

  const supabase = getSupabase();
  const bucket = 'user-content';
  const fileId = uuidv4();
  const extension = file.originalname.split('.').pop() || 'bin';
  const path = `${userId}/${type}/${fileId}.${extension}`;

  let processedBuffer = file.buffer;
  let width: number | null = null;
  let height: number | null = null;

  // Process images: resize/compress if needed
  if (file.mimetype.startsWith('image/')) {
    try {
      const image = sharp(file.buffer);
      const metadata = await image.metadata();
      width = metadata.width || null;
      height = metadata.height || null;

      // Resize large images for avatars/covers
      if (type === 'avatar') {
        processedBuffer = await image
          .resize(400, 400, { fit: 'cover' })
          .jpeg({ quality: 85 })
          .toBuffer();
      } else if (type === 'cover') {
        processedBuffer = await image
          .resize(1500, 500, { fit: 'cover' })
          .jpeg({ quality: 85 })
          .toBuffer();
      } else {
        // For posts, limit max dimension to 2000px
        if ((metadata.width || 0) > 2000 || (metadata.height || 0) > 2000) {
          processedBuffer = await image
            .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
            .toBuffer();
        }
      }
    } catch (err) {
      logger.warn('Image processing failed, using original:', err);
    }
  }

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, processedBuffer, {
      contentType: file.mimetype,
      upsert: false,
      cacheControl: '31536000',
    });

  if (uploadError) {
    logger.error('Upload failed:', uploadError);
    throw new AppError('Failed to upload file', 500);
  }

  // Save metadata in DB
  const media = await MediaRepository.create({
    user_id: userId,
    bucket_path: path,
    file_name: file.originalname,
    mime_type: file.mimetype,
    size: processedBuffer.length,
    width,
    height,
  });

  return { mediaId: media.id };
};