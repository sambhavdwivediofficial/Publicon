import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { UserService } from '../services/user.service';

export class FollowController {
  static follow = asyncHandler(async (req: Request, res: Response) => {
    const followerId = req.user!.userId;
    const { userId } = req.params;
    const result = await UserService.followUser(followerId, userId);
    ApiResponse.success(res, result, 'Followed successfully');
  });

  static unfollow = asyncHandler(async (req: Request, res: Response) => {
    const followerId = req.user!.userId;
    const { userId } = req.params;
    const result = await UserService.unfollowUser(followerId, userId);
    ApiResponse.success(res, result, 'Unfollowed successfully');
  });

  static getStatus = asyncHandler(async (req: Request, res: Response) => {
    const followerId = req.user!.userId;
    const { userId } = req.params;
    const status = await UserService.getFollowStatus(followerId, userId);
    ApiResponse.success(res, status);
  });
}