import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title too short').max(300, 'Title too long'),
    body: z.string().min(10, 'Post body too short').max(50000).optional(),
    communityId: z.string().uuid('Invalid community ID'),
    mediaIds: z.array(z.string().uuid()).max(10).optional(),
    isPinned: z.boolean().optional().default(false),
  }),
});

export const updatePostSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid post ID'),
  }),
  body: z.object({
    title: z.string().min(5).max(300).optional(),
    body: z.string().min(10).max(50000).optional(),
    mediaIds: z.array(z.string().uuid()).max(10).optional(),
  }),
});

export const getPostSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid post ID'),
  }),
});

export const listPostsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(50).optional().default(20),
    sort: z.enum(['newest', 'hot', 'top']).optional().default('hot'),
    communityId: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
  }),
});

export const deletePostSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid post ID'),
  }),
});