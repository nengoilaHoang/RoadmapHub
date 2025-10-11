import express from "express";
import NotificationController from "../controllers/Notification.controller.js";
import requireAuth from "../middlewares/RequireAuth.js";
const router = express.Router();

// All notification operations require authentication
router.post("/create", requireAuth, NotificationController.createNotification);
router.get(
  "/receiver",
  requireAuth,
  NotificationController.getNotificationsByReceiverId
);
router.put("/markAsRead", requireAuth, NotificationController.markAsRead);
export default router;
