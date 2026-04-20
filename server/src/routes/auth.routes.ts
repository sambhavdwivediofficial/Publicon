import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validateRequest';
import { googleAuthSchema } from '../validators/auth.validator';

const router = Router();

router.post(
  '/google',
  validateRequest(googleAuthSchema),
  AuthController.googleLogin
);

export default router;