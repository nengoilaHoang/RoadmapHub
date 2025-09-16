import PostService from "../services/Post.service.js"
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