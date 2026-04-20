import { Router } from 'express';
import { FeedController } from '../controllers/feed.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.get(
  '/',
  authenticate,
  FeedController.getFeed
);

export default router;