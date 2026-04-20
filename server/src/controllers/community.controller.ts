import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { CommunityService } from '../services/community.service';

export class CommunityController {
  static create = asyncHandler(async (req: Request, res: Response) => {
    const createdBy = req.user!.userId;
    const community = await CommunityService.createCommunity({
      ...req.body,
      createdBy,
    });
    ApiResponse.success(res, community, 'Community created', 201);
  });

  static list = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, sort, search } = req.query;
    const result = await CommunityService.listCommunities({
      page: Number(page),
      limit: Number(limit),
      sort: sort as string,
      search: search as string,
    });
    ApiResponse.paginated(res, result.data, result.total, Number(page), Number(limit));
  });

  static get = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const community = await CommunityService.getCommunity(slug);
    ApiResponse.success(res, community);
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const userId = req.user!.userId;
    const community = await CommunityService.getCommunity(slug);
    const updated = await CommunityService.updateCommunity(community.id, userId, req.body);
    ApiResponse.success(res, updated, 'Community updated');
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const userId = req.user!.userId;
    const community = await CommunityService.getCommunity(slug);
    await CommunityService.deleteCommunity(community.id, userId);
    ApiResponse.success(res, null, 'Community deleted');
  });

  static join = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const userId = req.user!.userId;
    const community = await CommunityService.getCommunity(slug);
    await CommunityService.joinCommunity(community.id, userId);
    ApiResponse.success(res, null, 'Joined community');
  });

  static leave = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const userId = req.user!.userId;
    const community = await CommunityService.getCommunity(slug);
    await CommunityService.leaveCommunity(community.id, userId);
    ApiResponse.success(res, null, 'Left community');
  });
}