import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { LikeService } from '../services/like.service';

export class LikeController {
  static like = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { targetType, targetId } = req.params;
    const result = await LikeService.like(userId, targetType, targetId);
    ApiResponse.success(res, result);
  });

  static unlike = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { targetType, targetId } = req.params;
    const result = await LikeService.unlike(userId, targetType, targetId);
    ApiResponse.success(res, result);
  });

  static getStatus = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { targetType, targetId } = req.params;
    const status = await LikeService.getLikeStatus(userId, targetType, targetId);
    ApiResponse.success(res, status);
  });
}