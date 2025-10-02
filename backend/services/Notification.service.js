import NotificationDAO from '../daos/Notification.dao.js';
class NotificationService {
    async createNotification(receiverId, senderId, content, link) {  
        return await  NotificationDAO.createNotification(receiverId, senderId, content, link);
    }
    async getNotificationsByReceiverId(receiverId) {
        return await NotificationDAO.getNotificationsByReceiverId(receiverId);
    }
    async markAsRead(notificationId) {
        return await NotificationDAO.markAsRead(notificationId);
    }
}
export default new NotificationService();