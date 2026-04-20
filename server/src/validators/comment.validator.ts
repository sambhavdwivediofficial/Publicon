import { z } from 'zod';

export const createCommentSchema = z.object({
  body: z.object({
    body: z.string().min(1, 'Comment cannot be empty').max(5000, 'Comment too long'),
    targetType: z.enum(['question', 'answer', 'post']),
    targetId: z.string().uuid('Invalid target ID'),
    parentId: z.string().uuid('Invalid parent comment ID').optional(),
  }),
});

export const updateCommentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid comment ID'),
  }),
  body: z.object({
    body: z.string().min(1).max(5000),
  }),
});

export const getCommentsSchema = z.object({
  query: z.object({
    targetType: z.enum(['question', 'answer', 'post']),
    targetId: z.string().uuid('Invalid target ID'),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(50).optional().default(20),
    sort: z.enum(['newest', 'oldest', 'top']).optional().default('newest'),
  }),
});

export const deleteCommentSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid comment ID'),
  }),
});