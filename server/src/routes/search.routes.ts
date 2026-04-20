import { Router } from 'express';
import { SearchController } from '../controllers/search.controller';
import { validateRequest } from '../middleware/validateRequest';
import { globalSearchSchema } from '../validators/search.validator';

const router = Router();

router.get(
  '/',
  validateRequest(globalSearchSchema),
  SearchController.globalSearch
);

export default router;