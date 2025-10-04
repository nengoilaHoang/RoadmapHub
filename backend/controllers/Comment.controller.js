import CommentService from '../services/Comment.service.js';

class CommentController {
    async getCommentsByPost(req, res) {
        try {
            const { postId } = req.params;
            const comments = await CommentService.getCommentsByPost(postId);
            res.json(comments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async createComment(req, res) {
        const { classroomId, postId, content } = req.body;
        const accountId  = req.authenticate.id
        const response = await CommentService.createComment(accountId, classroomId, postId, content);
        res.json(response);
    }

    async updateComment(req, res) {
      
            const { id } = req.params;
            const { content } = req.body;
            const response = await CommentService.updateComment(id, content);
            res.json(response);
    }

    async deleteComment(req, res) {
        const { id } = req.params;
        const response = await CommentService.deleteComment(id);
        res.json(response);
    }
}

export default new CommentController();
