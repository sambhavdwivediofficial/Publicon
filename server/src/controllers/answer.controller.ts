import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { AnswerService } from '../services/answer.service';

export class AnswerController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const authorId = req.user!.userId;
    const { questionId } = req.params;
    const answer = await AnswerService.createAnswer({
      ...req.body,
      questionId,
      authorId,
    });
    ApiResponse.success(res, answer, 'Answer posted', 201);
  });

  static listByQuestion = asyncHandler(async (req: Request, res: Response) => {
    const { questionId } = req.params;
    const { page, limit, sort } = req.query;
    const result = await AnswerService.listAnswersByQuestion(questionId, {
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
    });
    ApiResponse.paginated(res, result.data, result.total, Number(page), Number(limit));
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const authorId = req.user!.userId;
    const updated = await AnswerService.updateAnswer(id, authorId, req.body);
    ApiResponse.success(res, updated, 'Answer updated');
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const authorId = req.user!.userId;
    await AnswerService.deleteAnswer(id, authorId);
    ApiResponse.success(res, null, 'Answer deleted');
  });
}