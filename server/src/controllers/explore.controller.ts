import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { ExploreService } from '../services/explore.service';

export class ExploreController {
  static search = asyncHandler(async (req: Request, res: Response) => {
    const { q, includeAI, page, limit } = req.query;
    const result = await ExploreService.search(
      q as string,
      includeAI === 'true',
      Number(page),
      Number(limit)
    );
    ApiResponse.success(res, result);
  });

  static getTopic = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const topic = await ExploreService.getTopic(slug);
    ApiResponse.success(res, topic);
  });

  static getRelatedTopics = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const related = await ExploreService.getRelatedTopics(slug);
    ApiResponse.success(res, related);
  });
}