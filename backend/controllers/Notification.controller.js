import NotificationService from '../services/Notification.service.js';
class NotificationController {
    async createNotification(req, res) {
        const { receiverId, senderId, content } = req.body;
        const response = await NotificationService.createNotification(receiverId, senderId, content);
        res.json(response);
    }
    async getNotificationsByReceiverId(req, res) {
        const accountId = req.authenticate.id;
        const receiverId = accountId;
        const notifications = await NotificationService.getNotificationsByReceiverId(receiverId);
        res.json(notifications);
    }
    async markAsRead(req, res) {
        const { notificationId } = req.body;
        //console.log("sss",notificationId)
        const response = await NotificationService.markAsRead(notificationId);
        res.json(response);
    }
}
export default new NotificationController();