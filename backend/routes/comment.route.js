import { Router } from "express";
import CommentController from "../controllers/Comment.controller.js";
import requireAuth from "../middlewares/RequireAuth.js";

const router = Router();

// All comment operations require authentication
// router.get('/post/:postId', CommentController.getCommentsByPost);
router.post("/create", requireAuth, CommentController.createComment);
router.put("/update/:id", requireAuth, CommentController.updateComment);
router.delete("/delete/:id", requireAuth, CommentController.deleteComment);

export default router;
