import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { FeedService } from '../services/feed.service';

export class FeedController {
  static getFeed = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const feed = await FeedService.getPersonalizedFeed(userId, page, limit);
    ApiResponse.paginated(res, feed.data, feed.total, page, limit);
  });
}