import { z } from 'zod';

export const shareSchema = z.object({
  params: z.object({
    targetType: z.enum(['question', 'answer', 'post']),
    targetId: z.string().uuid('Invalid target ID'),
  }),
  body: z.object({
    platform: z.enum(['twitter', 'facebook', 'linkedin', 'copy', 'whatsapp', 'other']).optional(),
  }),
});