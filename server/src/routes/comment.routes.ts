import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import {
  createCommentSchema,
  getCommentsSchema,
  updateCommentSchema,
  deleteCommentSchema,
} from '../validators/comment.validator';

const router = Router();

router.get(
  '/',
  validateRequest(getCommentsSchema),
  CommentController.list
);

router.post(
  '/',
  authenticate,
  validateRequest(createCommentSchema),
  CommentController.create
);

router.put(
  '/:id',
  authenticate,
  validateRequest(updateCommentSchema),
  CommentController.update
);

router.delete(
  '/:id',
  authenticate,
  validateRequest(deleteCommentSchema),
  CommentController.delete
);

router.get(
  '/:parentId/replies',
  CommentController.getReplies
);

export default router;