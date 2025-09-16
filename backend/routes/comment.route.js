import { Router } from 'express';
import CommentController from '../controllers/Comment.controller.js';

const router = Router();

// router.get('/post/:postId', CommentController.getCommentsByPost);
router.post('/create', CommentController.createComment);
router.put('/update/:id', CommentController.updateComment);
router.delete('/delete/:id', CommentController.deleteComment);

export default router;
