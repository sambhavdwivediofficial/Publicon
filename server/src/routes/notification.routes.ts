import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import {
  getNotificationsSchema,
  markAsReadSchema,
  markAllAsReadSchema,
} from '../validators/notification.validator';

const router = Router();

router.get(
  '/',
  authenticate,
  validateRequest(getNotificationsSchema),
  NotificationController.list
);

router.patch(
  '/:id/read',
  authenticate,
  validateRequest(markAsReadSchema),
  NotificationController.markAsRead
);

router.patch(
  '/read-all',
  authenticate,
  validateRequest(markAllAsReadSchema),
  NotificationController.markAllAsRead
);

export default router;