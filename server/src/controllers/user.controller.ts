import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { UserService } from '../services/user.service';

export class UserController {
  static getProfile = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const profile = await UserService.getProfile(userId, req.user?.userId);
    ApiResponse.success(res, profile);
  });

  static getProfileByUsername = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const profile = await UserService.getProfileByUsername(username, req.user?.userId);
    ApiResponse.success(res, profile);
  });

  static updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const updated = await UserService.updateProfile(userId, req.body);
    ApiResponse.success(res, updated, 'Profile updated');
  });
}