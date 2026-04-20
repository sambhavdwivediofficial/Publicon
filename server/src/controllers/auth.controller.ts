import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static googleLogin = asyncHandler(async (req: Request, res: Response) => {
    const { idToken } = req.body;
    const result = await AuthService.googleLogin(idToken);
    ApiResponse.success(res, result, 'Login successful');
  });
}