import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { PostService } from '../services/post.service';

export class PostController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const authorId = req.user!.userId;
    const post = await PostService.createPost({
      ...req.body,
      authorId,
    });
    ApiResponse.success(res, post, 'Post created', 201);
  });

  static list = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, sort, communityId, userId } = req.query;
    const result = await PostService.listPosts({
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
      communityId: communityId as string,
      userId: userId as string,
    });
    ApiResponse.paginated(res, result.data, result.total, Number(page), Number(limit));
  });

  static get = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostService.getPost(id);
    ApiResponse.success(res, post);
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const authorId = req.user!.userId;
    const updated = await PostService.updatePost(id, authorId, req.body);
    ApiResponse.success(res, updated, 'Post updated');
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const authorId = req.user!.userId;
    await PostService.deletePost(id, authorId);
    ApiResponse.success(res, null, 'Post deleted');
  });
}