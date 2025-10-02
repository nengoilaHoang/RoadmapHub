import express from 'express';
import NotificationController from '../controllers/Notification.controller.js';
const router = express.Router();
router.post("/create", NotificationController.createNotification);
router.get("/receiver", NotificationController.getNotificationsByReceiverId);
router.put("/markAsRead", NotificationController.markAsRead);
export default router;