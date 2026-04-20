import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { InsightService } from '../services/insight.service';

export class InsightController {
  static getTrending = asyncHandler(async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 20;
    const trending = await InsightService.getTrending(limit);
    ApiResponse.success(res, trending);
  });

  static getTopAnswers = asyncHandler(async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 20;
    const answers = await InsightService.getTopAnswers(limit);
    ApiResponse.success(res, answers);
  });
}