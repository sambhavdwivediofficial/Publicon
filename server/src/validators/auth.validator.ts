import { z } from 'zod';

export const googleAuthSchema = z.object({
  body: z.object({
    idToken: z.string().min(1, 'ID token is required'),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});