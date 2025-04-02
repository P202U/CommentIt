import express from 'express';
import { createComment, getComments, deleteComment, editComment } from '@controllers/comment.controller';
import { authenticateJWT } from '@middleware/auth.middleware';

const router = express.Router();

router.get('/get-comments', getComments);
router.post('/create-comment', authenticateJWT, createComment);
router.delete('/:commentId', authenticateJWT, deleteComment);
router.patch('/:commentId', authenticateJWT, editComment);

export default router;