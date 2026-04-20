import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse';

export const notFound = (req: Request, res: Response): void => {
  ApiResponse.error(res, `Route ${req.originalUrl} not found`, 404);
};