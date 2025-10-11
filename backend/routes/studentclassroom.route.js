import express from "express";
import StudentClassroomController from "../controllers/StudentClassroom.controller.js";
import requireAuth from "../middlewares/RequireAuth.js";
const router = express.Router();

// All student classroom operations require authentication
router.get("/student-list", requireAuth, StudentClassroomController.getAll);
router.delete("/remove", requireAuth, StudentClassroomController.removeStudent);
router.post("/add", requireAuth, StudentClassroomController.addStudent);
export default router;
