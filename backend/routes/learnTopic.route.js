import express from "express";
import LearnTopicController from "../controllers/LearnTopic.controller.js";
import requireAuth from "../middlewares/RequireAuth.js";
//lưu file tạm
const router = express.Router();

// All routes require authentication
router.get(
  "/get-learnTopic/:topicId",
  requireAuth,
  LearnTopicController.getLearnTopic
);
router.post(
  "/create-learnTopic",
  requireAuth,
  LearnTopicController.createLearnTopic
);
router.post(
  "/update-learnTopic",
  requireAuth,
  LearnTopicController.updateLearnTopic
);
router.post(
  "/delete-learnTopic",
  requireAuth,
  LearnTopicController.deleteLearnTopic
);
//router.post('/solve-nodes-progress', LearnTopicController.getNodesWithTopicStatus);
export default router;
