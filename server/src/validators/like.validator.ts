import { z } from 'zod';

export const likeSchema = z.object({
  params: z.object({
    targetType: z.enum(['question', 'answer', 'post', 'comment']),
    targetId: z.string().uuid('Invalid target ID'),
  }),
});

export const unlikeSchema = z.object({
  params: z.object({
    targetType: z.enum(['question', 'answer', 'post', 'comment']),
    targetId: z.string().uuid('Invalid target ID'),
  }),
});