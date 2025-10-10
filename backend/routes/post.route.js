import express from "express";
import requireAuth from "../middlewares/RequireAuth.js";
const router = express.Router();
import PostController from "../controllers/Post.controller.js";

router.get("/getPosts", PostController.getPosts); // Public feed
router.post("/create", requireAuth, PostController.createPost);
router.put("/update/:id", requireAuth, PostController.updatePost);
router.delete("/delete/:id", requireAuth, PostController.deletePost);
export default router;
