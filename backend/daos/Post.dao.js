import genUUID from '../Helps/genUUID.js';
import Post from '../models/Post.model.js'
import db from '../utils/db.js'
class PostDAO {
    async getPosts(classroomId) {
        //console.log(classroomId);
        const rows = await db('Post as p')
            .leftJoin('Comment as c', 'c.postId', 'p.id')
            .leftJoin('Profile as ap', 'ap.accountId', 'p.accountId')
            .leftJoin('Profile as ac', 'ac.accountId', 'c.accountId')
            .select(
                'p.id as postId',
                'p.content as postContent',
                'p.createDate as postDate',
                'p.accountId as postAccountId',
                'ap.fullname as postAuthorName',
                'ap.avatar as postAuthorAvatar',

                'c.id as commentId',
                'c.content as commentContent',
                'c.createDate as commentDate',
                'c.accountId as commentAccountId',
                'ac.fullname as commentAuthorName',
                'ac.avatar as commentAuthorAvatar'
            )
            .where('p.classroomId', classroomId)
            .orderBy([{ column: 'p.createDate', order: 'desc' }, { column: 'c.createDate', order: 'asc' }]);
        const posts = [];
        const postMap = new Map();
        rows.forEach(row => {
            if (!postMap.has(row.postId)) {
                postMap.set(row.postId, {
                    post:{
                    postId: row.postId,
                    title: row.title,
                    content: row.postContent,
                    createDate: row.postDate,
                    name: row.postAuthorName,
                    avatar: row.postAuthorAvatar,
                    accountId: row.postAccountId
                    },
                    comments: []
                });
                posts.push(postMap.get(row.postId));
            }

            if (row.commentId) {
                postMap.get(row.postId).comments.push({
                    id: row.commentId,
                    content: row.commentContent,
                    createDate: row.commentDate,
                    repCommentId: row.repCommentId,
                    name: row.commentAuthorName,
                    avatar: row.commentAuthorAvatar,
                    accountId: row.commentAccountId
                });
            }
        });
        return posts;
        return rows;
    }
    async createPost(classroomId, accountId, content) {
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0];
        const post = new Post(genUUID(), accountId, classroomId, formattedDate, content);
        await await db('Post').insert(post);
        return ({
            success: true,
            message: "Creating post successfully",
            post: post
        })

    }
    async updatePost( id, content) {
        await db('Post')
            .where({ id: id })
            .update({ content: content });
        return ({
            success: true,
            message: "Updating post successfully"
        })
    }
    async deletePost(id) {
        await db('Comment').where({ postId: id })
            .del();
        await db('Post')
            .where({ id: id })
            .del();

        return ({
            success: true,
            message: "Deleting post successfully"
        })
    }
}
export default new PostDAO();