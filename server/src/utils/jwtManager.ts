import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export const generateSessionToken = (payload: SessionPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

export const verifySessionToken = (token: string): SessionPayload | null => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
};

export const decodeToken = (token: string): SessionPayload | null => {
  try {
    return jwt.decode(token) as SessionPayload;
  } catch {
    return null;
  }
};