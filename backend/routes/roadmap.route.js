import express from 'express';
import RoadmapController from '../controllers/Roadmap.controller.js';
const router = express.Router();
router.post('/create', RoadmapController.createRoadmap);
router.post('/edit/:name', RoadmapController.editRoadmap);
router.post('/delete/:name', RoadmapController.deleteRoadmap);
// router.get('/view/:name', RoadmapController.viewRoadmap);
export default router;