import { Router } from 'express';
import { ShareController } from '../controllers/share.controller';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import { shareSchema } from '../validators/share.validator';

const router = Router();

router.post(
  '/:targetType/:targetId',
  authenticate,
  validateRequest(shareSchema),
  ShareController.share
);

router.get(
  '/:targetType/:targetId/count',
  ShareController.getCount
);

export default router;