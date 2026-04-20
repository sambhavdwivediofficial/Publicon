import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ApiResponse } from '../utils/apiResponse';
import { env } from '../config/env';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(`Error: ${err.message}`, { stack: err.stack, url: req.url, method: req.method });

  if (err instanceof AppError && err.isOperational) {
    ApiResponse.error(res, err.message, err.statusCode);
    return;
  }

  const message = env.NODE_ENV === 'production' ? 'Internal server error' : err.message;
  ApiResponse.error(res, message, 500, env.NODE_ENV === 'development' ? err.stack : undefined);
};