import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, optionalAuth } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import {
  updateProfileSchema,
  getUserProfileSchema,
  getUserByUsernameSchema,
} from '../validators/user.validator';

const router = Router();

// Public profile by ID
router.get(
  '/:userId',
  validateRequest(getUserProfileSchema),
  optionalAuth,
  UserController.getProfile
);

// Public profile by username
router.get(
  '/username/:username',
  validateRequest(getUserByUsernameSchema),
  optionalAuth,
  UserController.getProfileByUsername
);

// Protected routes
router.put(
  '/profile',
  authenticate,
  validateRequest(updateProfileSchema),
  UserController.updateProfile
);

export default router;