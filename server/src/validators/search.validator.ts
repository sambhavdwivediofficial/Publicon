import { z } from 'zod';

export const globalSearchSchema = z.object({
  query: z.object({
    q: z.string().min(1, 'Search query required').max(200, 'Query too long'),
    type: z.enum(['all', 'questions', 'answers', 'posts', 'communities', 'users']).optional().default('all'),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(50).optional().default(20),
  }),
});

export const exploreSearchSchema = z.object({
  query: z.object({
    q: z.string().min(1).max(200),
    includeAI: z.coerce.boolean().optional().default(true),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(20).optional().default(10),
  }),
});

export const relatedTopicsSchema = z.object({
  params: z.object({
    slug: z.string().min(1).max(100),
  }),
});