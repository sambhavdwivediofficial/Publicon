import { Router } from 'express';
import { ExploreController } from '../controllers/explore.controller';
import { validateRequest } from '../middleware/validateRequest';
import {
  exploreSearchSchema,
  relatedTopicsSchema,
} from '../validators/search.validator';

const router = Router();

router.get(
  '/search',
  validateRequest(exploreSearchSchema),
  ExploreController.search
);

router.get(
  '/topic/:slug',
  ExploreController.getTopic
);

router.get(
  '/related/:slug',
  validateRequest(relatedTopicsSchema),
  ExploreController.getRelatedTopics
);

export default router;