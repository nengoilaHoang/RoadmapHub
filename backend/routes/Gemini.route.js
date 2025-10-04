import GeminiService from "../services/Gemini.service.js";
import express from 'express';
const router = express.Router();

router.post('/generate-roadmap', GeminiService.getNewRoadmap);

export default router;