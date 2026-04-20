import { z } from 'zod';

export const createCommunitySchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Community name too short').max(50, 'Community name too long'),
    slug: z
      .string()
      .min(3)
      .max(50)
      .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
    description: z.string().min(10).max(500),
    avatarUrl: z.string().url().optional(),
    coverUrl: z.string().url().optional(),
    isPrivate: z.boolean().optional().default(false),
    rules: z.array(z.string().max(500)).max(20).optional(),
    tags: z.array(z.string().min(1).max(30)).max(10).optional(),
  }),
});

export const updateCommunitySchema = z.object({
  params: z.object({
    slug: z.string().min(3).max(50),
  }),
  body: z.object({
    name: z.string().min(3).max(50).optional(),
    description: z.string().min(10).max(500).optional(),
    avatarUrl: z.string().url().optional(),
    coverUrl: z.string().url().optional(),
    isPrivate: z.boolean().optional(),
    rules: z.array(z.string().max(500)).max(20).optional(),
    tags: z.array(z.string().min(1).max(30)).max(10).optional(),
  }),
});

export const getCommunitySchema = z.object({
  params: z.object({
    slug: z.string().min(3).max(50),
  }),
});

export const listCommunitiesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(50).optional().default(20),
    sort: z.enum(['popular', 'newest', 'alphabetical']).optional().default('popular'),
    search: z.string().max(100).optional(),
  }),
});

export const joinCommunitySchema = z.object({
  params: z.object({
    slug: z.string().min(3).max(50),
  }),
});

export const leaveCommunitySchema = z.object({
  params: z.object({
    slug: z.string().min(3).max(50),
  }),
});

export const deleteCommunitySchema = z.object({
  params: z.object({
    slug: z.string().min(3).max(50),
  }),
});