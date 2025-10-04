import express from 'express';
import QuizController from '../controllers/Quiz.controller.js';
const router = express.Router();
router.get('/getQuiz', QuizController.getQuizClassroom);
router.post('/updateQuiz', QuizController.updateQuizClassroom);
router.get('/getQuizById', QuizController.getQuizById);
router.post('/doQuiz', QuizController.doQuiz);
export default router;