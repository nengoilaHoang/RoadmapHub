import express from 'express';
import ClassroomController from '../controllers/Classroom.controller.js'
const router = express.Router();
router.post("/check-your-classroom",ClassroomController.checkYourClassroom)
router.post("/create",ClassroomController.createClassroom);
router.get("/getNameAll",ClassroomController.getNameAll);
router.post("/addRoadmapIntoClass",ClassroomController.addRoadmapIntoClass)
router.get("/getRoadmapInClass",ClassroomController.getRoadmapInClass)
router.get("/getLearningClass",ClassroomController.getLearningClass);
router.post("/checkLearningClass",ClassroomController.checkLearningClass);
// router.get("/getAll",ClassroomController.getAll);
export default router;
