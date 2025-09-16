import PostDAO from '../daos/Post.dao.js'
class PostService{
    constructor(PostDAO){
        this.PostDAO = PostDAO;
    }
    async getPosts(classroomId){
        return await PostDAO.getPosts(classroomId);
    }
    async createPost(classroomId,accountId,content){
        return await PostDAO.createPost(classroomId,accountId,content);
    }
    async updatePost(id,content){
        return await PostDAO.updatePost(id,content);
    }
    async deletePost(id){
        return await PostDAO.deletePost(id);
    }
}
export default new PostService(PostDAO)