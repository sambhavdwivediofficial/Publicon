import { Router } from 'express';
import { AIController } from '../controllers/ai.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.post(
  '/answer',
  authenticate,
  AIController.generateAnswer
);

router.post(
  '/moderate',
  authenticate,
  AIController.moderateContent
);

router.post(
  '/suggest-tags',
  authenticate,
  AIController.suggestTags
);

export default router;