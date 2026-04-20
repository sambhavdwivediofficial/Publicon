import { Router } from 'express';
import { FollowController } from '../controllers/follow.controller';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import { followUserSchema } from '../validators/user.validator';

const router = Router();

router.post(
  '/:userId',
  authenticate,
  validateRequest(followUserSchema),
  FollowController.follow
);

router.delete(
  '/:userId',
  authenticate,
  validateRequest(followUserSchema),
  FollowController.unfollow
);

router.get(
  '/:userId/status',
  authenticate,
  validateRequest(followUserSchema),
  FollowController.getStatus
);

export default router;