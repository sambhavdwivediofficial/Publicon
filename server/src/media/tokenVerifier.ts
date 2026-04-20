import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { MediaTokenPayload } from './tokenSigner';

export const verifyMediaToken = (token: string): MediaTokenPayload | null => {
  try {
    return jwt.verify(token, env.MEDIA_CDN_SECRET) as MediaTokenPayload;
  } catch {
    return null;
  }
};