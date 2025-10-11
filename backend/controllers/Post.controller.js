import PostService from "../services/Post.service.js";
import NotificationService from "../services/Notification.service.js";
import StudentClassroomService from "../services/StudentClassroom.service.js";
import ClassroomService from "../services/Classroom.service.js";
import {
  truncateWords,
  stripHtmlAndCss,
} from "../Helps/TransferAndTruncateWords.js";
class PostController {
  async getPosts(req, res) {
    const { classroomId } = req.query;
    const response = await PostService.getPosts(classroomId);
    res.json(response);
  }
  async createPost(req, res) {
    const { classroomId, content } = req.body;
    const accountId = req.authenticate.id;
    const response = await PostService.createPost(
      classroomId,
      accountId,
      content
    );
    const listStudent = await StudentClassroomService.getAll(classroomId);
    const classroom = await ClassroomService.getRoadmapInClass(classroomId);
    const io = req.app.get("io");
    const userSockets = req.app.get("userSockets");

    //console.log("ssdasd",response.post.id);
    for (const student of listStudent) {
      const senderId = accountId;
      const receiverId = student.accountId;
      const plainText = stripHtmlAndCss(content);
      const truncated = truncateWords(plainText, 20);
      //console.log("truncated",truncated);
      const notificationContent = `Lớp ${classroom[0].name}: ${truncated}`;
      const link = `${process.env.FRONTEND_URL}/classroom/view-student/${classroom[0].name}/${classroomId}#post-${response.post.id}`;

      // Create notification in database
      await NotificationService.createNotification(
        receiverId,
        senderId,
        notificationContent,
        link
      );

      // Send real-time notification to specific user via Socket.IO
      const socketId = userSockets.get(receiverId);
      if (socketId) {
        io.to(socketId).emit("newNotification", {
          receiverId,
          senderId,
          content: notificationContent,
          link,
          message: "Có bài đăng mới từ giáo viên",
        });
        console.log(
          `📬 Notification sent to user ${receiverId} via socket ${socketId}`
        );
      } else {
        console.log(
          `⚠️ User ${receiverId} is not connected, notification saved to DB only`
        );
      }
    }

    res.json(response);
  }
  async updatePost(req, res) {
    const { content } = req.body;
    const { id } = req.params;
    const response = await PostService.updatePost(id, content);
    res.json(response);
  }
  async deletePost(req, res) {
    const { id } = req.params;
    const response = await PostService.deletePost(id);
    res.json(response);
  }
}
export default new PostController(PostService);
