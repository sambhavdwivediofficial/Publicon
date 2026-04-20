import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { MediaService } from '../services/media.service';
import { streamMediaToResponse } from '../media/mediaProxy';
import { verifyMediaToken } from '../media/tokenVerifier';
import { AppError } from '../middleware/errorHandler';

export class MediaController {
  static upload = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const file = req.file;
    if (!file) throw new AppError('No file provided', 400);
    const type = req.query.type as string || 'post';
    const result = await MediaService.uploadFile(file, userId, type);
    ApiResponse.success(res, result, 'File uploaded', 201);
  });

  static getToken = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { mediaId } = req.params;
    const token = MediaService.generateMediaToken(mediaId, userId);
    ApiResponse.success(res, { token });
  });

  static proxy = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;
    const payload = verifyMediaToken(token);
    if (!payload) throw new AppError('Invalid or expired media token', 401);
    await streamMediaToResponse(payload.mediaId, res);
  });
}