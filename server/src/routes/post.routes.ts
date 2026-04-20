import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { authenticate, optionalAuth } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
  listPostsSchema,
  deletePostSchema,
} from '../validators/post.validator';

const router = Router();

router.get(
  '/',
  validateRequest(listPostsSchema),
  optionalAuth,
  PostController.list
);

router.post(
  '/',
  authenticate,
  validateRequest(createPostSchema),
  PostController.create
);

router.get(
  '/:id',
  validateRequest(getPostSchema),
  optionalAuth,
  PostController.get
);

router.put(
  '/:id',
  authenticate,
  validateRequest(updatePostSchema),
  PostController.update
);

router.delete(
  '/:id',
  authenticate,
  validateRequest(deletePostSchema),
  PostController.delete
);

export default router;