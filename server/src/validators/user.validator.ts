import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name cannot be empty').max(100, 'Name too long').optional(),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username too long')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
      .optional(),
    bio: z.string().max(500, 'Bio too long').optional(),
    location: z.string().max(100, 'Location too long').optional(),
    website: z.string().url('Invalid URL').max(200).optional().or(z.literal('')),
  }),
});

export const getUserProfileSchema = z.object({
  params: z.object({
    userId: z.string().uuid('Invalid user ID'),
  }),
});

export const getUserByUsernameSchema = z.object({
  params: z.object({
    username: z.string().min(3).max(30),
  }),
});

export const followUserSchema = z.object({
  params: z.object({
    userId: z.string().uuid('Invalid user ID'),
  }),
});