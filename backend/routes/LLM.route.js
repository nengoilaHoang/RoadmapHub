import LLMService from "../services/LLM.service.js";
import express from 'express';
const router = express.Router();

router.post('/generate-roadmap', LLMService.getNewRoadmap);
router.post('/generate-roadmap-local', LLMService.getLLMResponse);

export default router;