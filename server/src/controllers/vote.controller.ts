import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { VoteService } from '../services/vote.service';

export class VoteController {
  static vote = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { targetType, targetId } = req.params;
    const { value } = req.body;
    const result = await VoteService.vote(userId, targetType, targetId, value);
    ApiResponse.success(res, result);
  });

  static removeVote = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { targetType, targetId } = req.params;
    const result = await VoteService.removeVote(userId, targetType, targetId);
    ApiResponse.success(res, result);
  });

  static getUserVote = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { targetType, targetId } = req.params;
    const voteValue = await VoteService.getUserVote(userId, targetType, targetId);
    ApiResponse.success(res, { value: voteValue });
  });
}