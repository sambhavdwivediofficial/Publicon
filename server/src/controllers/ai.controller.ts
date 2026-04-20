import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { AIService } from '../services/ai.service';

export class AIController {
  static generateAnswer = asyncHandler(async (req: Request, res: Response) => {
    const { prompt, context } = req.body;
    const answer = await AIService.generateAnswer(prompt, context);
    ApiResponse.success(res, answer);
  });

  static moderateContent = asyncHandler(async (req: Request, res: Response) => {
    const { content } = req.body;
    const result = await AIService.moderateContent(content);
    ApiResponse.success(res, result);
  });

  static suggestTags = asyncHandler(async (req: Request, res: Response) => {
    const { content } = req.body;
    const tags = await AIService.suggestTags(content);
    ApiResponse.success(res, tags);
  });
}