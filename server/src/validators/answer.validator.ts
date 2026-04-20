import { z } from 'zod';

export const createAnswerSchema = z.object({
  params: z.object({
    questionId: z.string().uuid('Invalid question ID'),
  }),
  body: z.object({
    body: z.string().min(50, 'Answer must be at least 50 characters').max(100000),
    isAnonymous: z.boolean().optional().default(false),
    aiAssisted: z.boolean().optional().default(false),
  }),
});

export const updateAnswerSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid answer ID'),
  }),
  body: z.object({
    body: z.string().min(50).max(100000),
  }),
});

export const getAnswerSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid answer ID'),
  }),
});

export const listAnswersSchema = z.object({
  params: z.object({
    questionId: z.string().uuid('Invalid question ID'),
  }),
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(50).optional().default(10),
    sort: z.enum(['votes', 'newest', 'oldest']).optional().default('votes'),
  }),
});

export const deleteAnswerSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid answer ID'),
  }),
});