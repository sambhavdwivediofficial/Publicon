import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { TagService } from '../services/tag.service';

export class TagController {
  static list = asyncHandler(async (req: Request, res: Response) => {
    const tags = await TagService.listTags();
    ApiResponse.success(res, tags);
  });

  static suggest = asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;
    const tags = await TagService.suggestTags(q as string);
    ApiResponse.success(res, tags);
  });

  static getTag = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const tag = await TagService.getTag(slug);
    ApiResponse.success(res, tag);
  });
}