import { z } from 'zod';

export const getNotificationsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(50).optional().default(20),
    unreadOnly: z.coerce.boolean().optional().default(false),
  }),
});

export const markAsReadSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid notification ID'),
  }),
});

export const markAllAsReadSchema = z.object({
  body: z.object({}).optional(), // No body needed
});