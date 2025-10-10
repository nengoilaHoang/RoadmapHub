import express from "express";
import ProfileController from "../controllers/Profile.controller.js";
import requireAuth from "../middlewares/RequireAuth.js";
//lưu file tạm
import multer from "multer";
const upload = multer({ dest: "uploads/" }); // thư mục lưu file tạm thời
const router = express.Router();

router.get("/get-profile", requireAuth, ProfileController.getProfile);
router.post("/update-profile", requireAuth, ProfileController.updateProfile);
router.post(
  "/update-avatar",
  requireAuth,
  upload.single("avatar"),
  ProfileController.updateAvatar
);
export default router;
