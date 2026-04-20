import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import questionRoutes from './question.routes';
import answerRoutes from './answer.routes';
import postRoutes from './post.routes';
import communityRoutes from './community.routes';
import commentRoutes from './comment.routes';
import feedRoutes from './feed.routes';
import exploreRoutes from './explore.routes';
import insightRoutes from './insight.routes';
import notificationRoutes from './notification.routes';
import searchRoutes from './search.routes';
import mediaRoutes from './media.routes';
import tagRoutes from './tag.routes';
import aiRoutes from './ai.routes';
import voteRoutes from './vote.routes';
import likeRoutes from './like.routes';
import shareRoutes from './share.routes';
import followRoutes from './follow.routes';

const router = Router();

// Health check already in app.ts

// API v1 routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/questions', questionRoutes);
router.use('/answers', answerRoutes);
router.use('/posts', postRoutes);
router.use('/communities', communityRoutes);
router.use('/comments', commentRoutes);
router.use('/feed', feedRoutes);
router.use('/explore', exploreRoutes);
router.use('/insights', insightRoutes);
router.use('/notifications', notificationRoutes);
router.use('/search', searchRoutes);
router.use('/media', mediaRoutes);
router.use('/tags', tagRoutes);
router.use('/ai', aiRoutes);
router.use('/votes', voteRoutes);
router.use('/likes', likeRoutes);
router.use('/shares', shareRoutes);
router.use('/follows', followRoutes);

export default router;