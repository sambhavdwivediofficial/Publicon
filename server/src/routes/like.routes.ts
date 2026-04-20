import { Router } from 'express';
import { LikeController } from '../controllers/like.controller';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import { likeSchema } from '../validators/like.validator';

const router = Router();

router.post(
  '/:targetType/:targetId',
  authenticate,
  validateRequest(likeSchema),
  LikeController.like
);

router.delete(
  '/:targetType/:targetId',
  authenticate,
  validateRequest(likeSchema),
  LikeController.unlike
);

router.get(
  '/:targetType/:targetId',
  authenticate,
  LikeController.getStatus
);

export default router;