import express from 'express';
import RoadmapController from '../controllers/Roadmap.controller.js';
const router = express.Router();
router.post('/create', RoadmapController.createRoadmap);
router.post('/edit/:name', RoadmapController.editRoadmap);
router.post('/delete/:name', RoadmapController.deleteRoadmap);
router.post('/edit-nodes', RoadmapController.editNodeRoadmap);
router.get('/edit/:name', RoadmapController.getRoadmapByName);
router.get('/getYourRoadmap/:name', RoadmapController.getRoadmapByAccountIdAndName);
router.post('/check-your-roadmap',RoadmapController.checkYourRoadmap)
router.get('/edit/view/:roadmapId', RoadmapController.viewRoadmap);
router.get('/view/:roadmapId', RoadmapController.viewRoadmapPublic);
router.get('/getRoadmapByUserId', RoadmapController.getRoadmapByUserId);
router.get('/getRoadmapByTeamId/:teamName', RoadmapController.getRoadmapByTeamId);
router.get('/getTopicRoadmapByUserId',RoadmapController.getTopicRoadmapByUserId);
export default router;