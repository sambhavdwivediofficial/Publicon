import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/apiResponse';
import { NotificationService } from '../services/notification.service';

export class NotificationController {
  static list = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { page, limit, unreadOnly } = req.query;
    const result = await NotificationService.getUserNotifications(
      userId,
      Number(page),
      Number(limit),
      unreadOnly === 'true'
    );
    ApiResponse.paginated(res, result.data, result.total, Number(page), Number(limit));
  });

  static markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { id } = req.params;
    await NotificationService.markAsRead(id, userId);
    ApiResponse.success(res, null, 'Marked as read');
  });

  static markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    await NotificationService.markAllAsRead(userId);
    ApiResponse.success(res, null, 'All notifications marked as read');
  });
}