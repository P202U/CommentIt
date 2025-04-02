import express from 'express';
import { getPosts, getPostDetails, createPost } from '@controllers/post.controller';
import { authenticateJWT } from '@middleware/auth.middleware';

const router = express.Router();

router.get('/all-posts', getPosts);
router.get('/:postId', getPostDetails);
router.post('/add-post', authenticateJWT, createPost);

export default router;