import { Router } from 'express';
import { AnswerController } from '../controllers/answer.controller';
import { authenticate, optionalAuth } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import {
  createAnswerSchema,
  updateAnswerSchema,
  listAnswersSchema,
  deleteAnswerSchema,
} from '../validators/answer.validator';

const router = Router();

router.post(
  '/:questionId',
  authenticate,
  validateRequest(createAnswerSchema),
  AnswerController.create
);

router.get(
  '/question/:questionId',
  validateRequest(listAnswersSchema),
  optionalAuth,
  AnswerController.listByQuestion
);

router.put(
  '/:id',
  authenticate,
  validateRequest(updateAnswerSchema),
  AnswerController.update
);

router.delete(
  '/:id',
  authenticate,
  validateRequest(deleteAnswerSchema),
  AnswerController.delete
);

export default router;