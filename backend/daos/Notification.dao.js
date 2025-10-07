import genUUID from '../Helps/genUUID.js';
import Notification from '../models/Notification.model.js'
import db from '../utils/db.js'
class NotificationDAO {
    async createNotification(receiverId, senderId, content, link) {
        const notification = new Notification(
            genUUID(),
            receiverId,
            senderId,
            content,
            false,
            new Date().toISOString(),
            link
        );
        
        await db('Notification').insert(notification);
        return {
            success: true,
            message: "Notification created successfully"
        };
    }
    async getNotificationsByReceiverId(receiverId) {
        const rows = await db('Notification')
            .where({ receiverId: receiverId })
            .orderBy('createDate', 'desc');
        return rows.map(row => Notification.fromRow(row));
    }
    async markAsRead(notificationId) {
        await db('Notification')
            .where({ id: notificationId })
            .update({ isRead: true });
        return {
            success: true,
            message: "Notification marked as read"
        };
    }
}
export default new NotificationDAO();