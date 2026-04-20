import { Request, Response, NextFunction } from 'express';
import { verifySessionToken, SessionPayload } from '../utils/jwtManager';
import { ApiResponse } from '../utils/apiResponse';

declare global {
  namespace Express {
    interface Request {
      user?: SessionPayload;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    ApiResponse.error(res, 'Unauthorized: No token provided', 401);
    return;
  }

  const token = authHeader.split(' ')[1];
  const payload = verifySessionToken(token);
  if (!payload) {
    ApiResponse.error(res, 'Unauthorized: Invalid or expired token', 401);
    return;
  }

  req.user = payload;
  next();
};

export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const payload = verifySessionToken(token);
    if (payload) req.user = payload;
  }
  next();
};