import { z } from 'zod';

export const voteSchema = z.object({
  params: z.object({
    targetType: z.enum(['question', 'answer', 'post', 'comment']),
    targetId: z.string().uuid('Invalid target ID'),
  }),
  body: z.object({
    value: z.number().refine((val) => val === 1 || val === -1, 'Vote value must be 1 (upvote) or -1 (downvote)'),
  }),
});

export const getVoteStatusSchema = z.object({
  params: z.object({
    targetType: z.enum(['question', 'answer', 'post', 'comment']),
    targetId: z.string().uuid('Invalid target ID'),
  }),
});