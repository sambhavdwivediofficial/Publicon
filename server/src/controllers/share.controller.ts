import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { ShareService } from '../services/share.service';

export class ShareController {
  static share = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { targetType, targetId } = req.params;
    const { platform } = req.body;
    const result = await ShareService.share(userId, targetType, targetId, platform);
    ApiResponse.success(res, result);
  });

  static getCount = asyncHandler(async (req: Request, res: Response) => {
    const { targetType, targetId } = req.params;
    const count = await ShareService.getShareCount(targetType, targetId);
    ApiResponse.success(res, { count });
  });
}