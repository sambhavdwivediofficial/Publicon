import { Router } from 'express';
import { QuestionController } from '../controllers/question.controller';
import { authenticate, optionalAuth } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import {
  createQuestionSchema,
  updateQuestionSchema,
  getQuestionSchema,
  listQuestionsSchema,
  deleteQuestionSchema,
} from '../validators/question.validator';

const router = Router();

router.get(
  '/',
  validateRequest(listQuestionsSchema),
  optionalAuth,
  QuestionController.list
);

router.post(
  '/',
  authenticate,
  validateRequest(createQuestionSchema),
  QuestionController.create
);

router.get(
  '/:id',
  validateRequest(getQuestionSchema),
  optionalAuth,
  QuestionController.get
);

router.put(
  '/:id',
  authenticate,
  validateRequest(updateQuestionSchema),
  QuestionController.update
);

router.delete(
  '/:id',
  authenticate,
  validateRequest(deleteQuestionSchema),
  QuestionController.delete
);

export default router;