import db from '../utils/db.js';
import genUUID from '../Helps/genUUID.js';
import Comment from '../models/Comment.model.js';

class CommentDAO {
    async getCommentsByPost(postId) {
        const rows = await db('Comment')
            .where({ postId })
            .orderBy('createDate', 'asc');

        return rows.map(row => new Comment(row));
    }

    async createComment(accountId, classroomId, postId, content) {
        
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0];
        const comment = new Comment(genUUID(),accountId, classroomId, postId,formattedDate, content)

        await db('Comment').insert(comment);

        return   ({
            success: true,
            message: "Creating comment successfully"
        });
    }

    async updateComment(id, content) {
        await db('Comment')
            .where({ id:id })
            .update({ content:content });

        return  ({
            success: true,
            message: "Updating comment successfully"
        });
    }

    async deleteComment(id) {
        await db('Comment')
            .where({ id:id })
            .del();

        return ({
            success: true,
            message: "Deleting comment successfully"
        });
    }
}

export default new CommentDAO();
