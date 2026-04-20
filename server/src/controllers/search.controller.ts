import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { SearchService } from '../services/search.service';

export class SearchController {
  static globalSearch = asyncHandler(async (req: Request, res: Response) => {
    const { q, type, page, limit } = req.query;
    const results = await SearchService.globalSearch(
      q as string,
      type as string,
      Number(page),
      Number(limit)
    );
    ApiResponse.success(res, results);
  });
}