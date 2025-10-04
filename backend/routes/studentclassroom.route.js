import express from 'express';
import StudentClassroomController from '../controllers/StudentClassroom.controller.js'
const router = express.Router();
router.get('/student-list',StudentClassroomController.getAll);
router.delete('/remove',StudentClassroomController.removeStudent);
router.post('/add',StudentClassroomController.addStudent);
export default router;