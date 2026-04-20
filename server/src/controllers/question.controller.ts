import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { QuestionService } from '../services/question.service';

export class QuestionController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const authorId = req.user!.userId;
    const question = await QuestionService.createQuestion({
      ...req.body,
      authorId,
    });
    ApiResponse.success(res, question, 'Question created', 201);
  });

  static list = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, sort, tag, communityId } = req.query;
    const result = await QuestionService.listQuestions({
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
      tag: tag as string,
      communityId: communityId as string,
    });
    ApiResponse.paginated(res, result.data, result.total, Number(page), Number(limit));
  });

  static get = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const question = await QuestionService.getQuestion(id, req.user?.userId);
    ApiResponse.success(res, question);
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const authorId = req.user!.userId;
    const updated = await QuestionService.updateQuestion(id, authorId, req.body);
    ApiResponse.success(res, updated, 'Question updated');
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const authorId = req.user!.userId;
    await QuestionService.deleteQuestion(id, authorId);
    ApiResponse.success(res, null, 'Question deleted');
  });
}