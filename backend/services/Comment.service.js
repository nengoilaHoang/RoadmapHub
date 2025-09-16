import CommentDAO from '../daos/Comment.dao.js';

class CommentService {
    constructor(CommentDAO) {
        this.CommentDAO = CommentDAO;
    }

    async getCommentsByPost(postId) {
        return await CommentDAO.getCommentsByPost(postId);
    }

    async createComment(accountId, classroomId, postId, content) {
        return await CommentDAO.createComment(accountId, classroomId, postId, content);
    }

    async updateComment(id, content) {
        return await CommentDAO.updateComment(id, content);
    }

    async deleteComment(id) {
        return await CommentDAO.deleteComment(id);
    }
}

export default new CommentService(CommentDAO);
