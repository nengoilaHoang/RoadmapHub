import express from "express";
import ClassroomController from "../controllers/Classroom.controller.js";
import requireAuth from "../middlewares/RequireAuth.js";
const router = express.Router();

// Protected routes - require authentication
router.post(
  "/check-your-classroom",
  requireAuth,
  ClassroomController.checkYourClassroom
);
router.post("/create", requireAuth, ClassroomController.createClassroom);
router.get("/getNameAll", requireAuth, ClassroomController.getNameAll);
router.post(
  "/addRoadmapIntoClass",
  requireAuth,
  ClassroomController.addRoadmapIntoClass
);
router.get(
  "/getLearningClass",
  requireAuth,
  ClassroomController.getLearningClass
);
router.post(
  "/checkLearningClass",
  requireAuth,
  ClassroomController.checkLearningClass
);
router.get(
  "/getTeachingClass",
  requireAuth,
  ClassroomController.getTeachingClass
);

// Public route - no authentication required
router.get("/getRoadmapInClass", ClassroomController.getRoadmapInClass);

// router.get("/getAll",ClassroomController.getAll);
export default router;
