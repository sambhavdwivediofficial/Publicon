import { Router } from 'express';
import { MediaController } from '../controllers/media.controller';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import {
  getMediaTokenSchema,
  proxyMediaSchema,
} from '../validators/media.validator';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post(
  '/upload',
  authenticate,
  upload.single('file'),
  MediaController.upload
);

router.get(
  '/token/:mediaId',
  authenticate,
  validateRequest(getMediaTokenSchema),
  MediaController.getToken
);

router.get(
  '/proxy/:token',
  validateRequest(proxyMediaSchema),
  MediaController.proxy
);

export default router;