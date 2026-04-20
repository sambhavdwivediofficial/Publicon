import { Router } from 'express';
import { InsightController } from '../controllers/insight.controller';

const router = Router();

router.get(
  '/trending',
  InsightController.getTrending
);

router.get(
  '/top-answers',
  InsightController.getTopAnswers
);

export default router;