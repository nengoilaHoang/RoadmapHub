import express from 'express';
const router = express.Router();
import PostController from '../controllers/Post.controller.js';

router.get('/getPosts',PostController.getPosts);
router.post('/create', PostController.createPost);
router.put('/update/:id', PostController.updatePost);
router.delete('/delete/:id', PostController.deletePost);
export default router;