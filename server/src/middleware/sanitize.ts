import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Basic sanitization middleware for common inputs
export const sanitizeInput = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body) {
    // Trim all string fields
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  next();
};