import { Router } from 'express';
import { TagController } from '../controllers/tag.controller';

const router = Router();

router.get(
  '/',
  TagController.list
);

router.get(
  '/suggest',
  TagController.suggest
);

router.get(
  '/:slug',
  TagController.getTag
);

export default router;