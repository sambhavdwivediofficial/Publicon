import { z } from 'zod';

// For upload request validation (file handled by multer)
export const uploadMediaSchema = z.object({
  query: z.object({
    type: z.enum(['avatar', 'cover', 'post', 'community']),
  }),
});

export const getMediaTokenSchema = z.object({
  params: z.object({
    mediaId: z.string().uuid('Invalid media ID'),
  }),
});

export const proxyMediaSchema = z.object({
  params: z.object({
    token: z.string().min(10, 'Invalid token'),
  }),
});

export const deleteMediaSchema = z.object({
  params: z.object({
    mediaId: z.string().uuid('Invalid media ID'),
  }),
});

export const listMediaSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(50).optional().default(20),
    userId: z.string().uuid().optional(),
    type: z.enum(['avatar', 'cover', 'post', 'community']).optional(),
  }),
});