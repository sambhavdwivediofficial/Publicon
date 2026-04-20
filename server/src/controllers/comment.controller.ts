import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { CommentService } from '../services/comment.service';

export class CommentController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const authorId = req.user!.userId;
    const comment = await CommentService.createComment({
      ...req.body,
      authorId,
    });
    ApiResponse.success(res, comment, 'Comment added', 201);
  });

  static list = asyncHandler(async (req: Request, res: Response) => {
    const { targetType, targetId, page, limit, sort } = req.query;
    const result = await CommentService.getComments({
      targetType: targetType as string,
      targetId: targetId as string,
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
    });
    ApiResponse.paginated(res, result.data, result.total, Number(page), Number(limit));
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const authorId = req.user!.userId;
    const { body } = req.body;
    const updated = await CommentService.updateComment(id, authorId, body);
    ApiResponse.success(res, updated, 'Comment updated');
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const authorId = req.user!.userId;
    await CommentService.deleteComment(id, authorId);
    ApiResponse.success(res, null, 'Comment deleted');
  });

  static getReplies = asyncHandler(async (req: Request, res: Response) => {
    const { parentId } = req.params;
    const replies = await CommentService.getReplies(parentId);
    ApiResponse.success(res, replies);
  });
}