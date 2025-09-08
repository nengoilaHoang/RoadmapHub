import express from 'express';
import LearnTopicController from '../controllers/LearnTopic.controller.js';
//lưu file tạm
const router = express.Router();

router.get('/get-learnTopic/:topicId', LearnTopicController.getLearnTopic);
router.post('/create-learnTopic', LearnTopicController.createLearnTopic);
router.post('/update-learnTopic', LearnTopicController.updateLearnTopic);
router.post('/delete-learnTopic', LearnTopicController.deleteLearnTopic);
router.post('/solve-nodes-progress', LearnTopicController.getNodesWithTopicStatus);
export default router;