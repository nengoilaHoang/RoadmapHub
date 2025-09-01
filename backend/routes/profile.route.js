import express from 'express';
import ProfileController from '../controllers/Profile.controller.js';
//lưu file tạm
import multer from "multer";
const upload = multer({ dest: "uploads/" }); // thư mục lưu file tạm thời
const router = express.Router();

router.get('/get-profile', ProfileController.getProfile);
router.post('/update-profile', ProfileController.updateProfile);
router.post('/update-avatar', upload.single("avatar"), ProfileController.updateAvatar);
export default router;