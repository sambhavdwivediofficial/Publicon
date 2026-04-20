import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface MediaTokenPayload {
  mediaId: string;
  userId: string;
}

export const signMediaToken = (payload: MediaTokenPayload): string => {
  return jwt.sign(payload, env.MEDIA_CDN_SECRET, {
    expiresIn: env.MEDIA_SIGNED_TOKEN_EXPIRES,
  });
};