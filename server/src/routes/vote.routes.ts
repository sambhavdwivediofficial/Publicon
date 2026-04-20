import { Router } from 'express';
import { VoteController } from '../controllers/vote.controller';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import { voteSchema } from '../validators/vote.validator';

const router = Router();

router.post(
  '/:targetType/:targetId',
  authenticate,
  validateRequest(voteSchema),
  VoteController.vote
);

router.delete(
  '/:targetType/:targetId',
  authenticate,
  validateRequest(voteSchema),
  VoteController.removeVote
);

router.get(
  '/:targetType/:targetId',
  authenticate,
  VoteController.getUserVote
);

export default router;