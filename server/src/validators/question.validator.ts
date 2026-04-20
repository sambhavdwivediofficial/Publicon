import { z } from 'zod';

export const createQuestionSchema = z.object({
  body: z.object({
    title: z.string().min(10, 'Title must be at least 10 characters').max(300, 'Title too long'),
    body: z.string().min(20, 'Question body must be at least 20 characters').max(50000),
    tags: z.array(z.string().min(1).max(50)).min(1, 'At least one tag is required').max(10, 'Maximum 10 tags allowed'),
    communityId: z.string().uuid('Invalid community ID').optional(),
    isAnonymous: z.boolean().optional().default(false),
  }),
});

export const updateQuestionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid question ID'),
  }),
  body: z.object({
    title: z.string().min(10).max(300).optional(),
    body: z.string().min(20).max(50000).optional(),
    tags: z.array(z.string().min(1).max(50)).min(1).max(10).optional(),
  }),
});

export const getQuestionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid question ID'),
  }),
});

export const listQuestionsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(20),
    sort: z.enum(['newest', 'trending', 'unanswered']).optional().default('newest'),
    tag: z.string().optional(),
    communityId: z.string().uuid().optional(),
  }),
});

export const deleteQuestionSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid question ID'),
  }),
});