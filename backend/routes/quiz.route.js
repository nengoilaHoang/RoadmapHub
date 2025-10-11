import express from "express";
import QuizController from "../controllers/Quiz.controller.js";
import requireAuth from "../middlewares/RequireAuth.js";
const router = express.Router();

// All quiz operations require authentication
router.get("/getQuiz", requireAuth, QuizController.getQuizClassroom);
router.post("/updateQuiz", requireAuth, QuizController.updateQuizClassroom);
router.get("/getQuizById", requireAuth, QuizController.getQuizById);
router.post("/doQuiz", requireAuth, QuizController.doQuiz);
export default router;
