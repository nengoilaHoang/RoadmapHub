import PostService from "../services/Post.service.js"
import NotificationService from "../services/Notification.service.js";
import StudentClassroomService from '../services/StudentClassroom.service.js'
import ClassroomService from '../services/Classroom.service.js'
import { truncateWords, stripHtmlAndCss } from "../Helps/TransferAndTruncateWords.js";
class PostController{
    async getPosts(req,res){
        const {classroomId} = req.query;
        const response  = await PostService.getPosts(classroomId);
        res.json(response); 

    }
    async createPost(req,res){
        const {classroomId,content} = req.body;
        const accountId = req.authenticate.id
        const response  = await PostService.createPost(classroomId,accountId,content);
        const listStudent = await StudentClassroomService.getAll(classroomId);
        const classroom = await ClassroomService.getRoadmapInClass(accountId,classroomId);
        console.log("ssdasd",response.post.id);
        for(const student of listStudent){
            const senderId = accountId;
            const receiverId = student.accountId;
            const plainText = stripHtmlAndCss(content);
            const truncated = truncateWords(plainText, 20);
            console.log("truncated",truncated);
            const notificationContent = `Lớp ${classroom[0].name}: ${truncated}`;
            const link = `http://localhost:3000/classroom/view-student/${classroom[0].name}/${classroomId}#post-${response.post.id}`;
            await NotificationService.createNotification(receiverId,senderId,notificationContent,link);
        }
        const io = req.app.get("io");
        io.emit("newNotification", {
            classroomId,
            accountId,
            content,
            message: "Có bài đăng mới từ giáo viên"
        });
        res.json(response); 
    }
    async updatePost(req,res){
        const {content} = req.body;
        const {id} = req.params;
        const response  = await PostService.updatePost(id,content);
        res.json(response); 
    }
    async deletePost(req,res){
        const {id} = req.params;
        const response  = await PostService.deletePost(id);
        res.json(response); 
    }
}
export default new PostController(PostService)