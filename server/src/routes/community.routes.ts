import { Router } from 'express';
import { CommunityController } from '../controllers/community.controller';
import { authenticate, optionalAuth } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import {
  createCommunitySchema,
  updateCommunitySchema,
  getCommunitySchema,
  listCommunitiesSchema,
  joinCommunitySchema,
  leaveCommunitySchema,
  deleteCommunitySchema,
} from '../validators/community.validator';

const router = Router();

router.get(
  '/',
  validateRequest(listCommunitiesSchema),
  CommunityController.list
);

router.post(
  '/',
  authenticate,
  validateRequest(createCommunitySchema),
  CommunityController.create
);

router.get(
  '/:slug',
  validateRequest(getCommunitySchema),
  optionalAuth,
  CommunityController.get
);

router.put(
  '/:slug',
  authenticate,
  validateRequest(updateCommunitySchema),
  CommunityController.update
);

router.delete(
  '/:slug',
  authenticate,
  validateRequest(deleteCommunitySchema),
  CommunityController.delete
);

router.post(
  '/:slug/join',
  authenticate,
  validateRequest(joinCommunitySchema),
  CommunityController.join
);

router.delete(
  '/:slug/leave',
  authenticate,
  validateRequest(leaveCommunitySchema),
  CommunityController.leave
);

export default router;