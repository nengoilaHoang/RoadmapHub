import express from 'express';
import ProfileController from '../controllers/Profile.controller.js';
const router = express.Router();

router.get('/get-profile', ProfileController.getProfile);
router.post('/update-profile', ProfileController.updateProfile);

export default router;