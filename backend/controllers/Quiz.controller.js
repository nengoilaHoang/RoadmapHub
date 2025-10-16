import QuizService from "../services/Quiz.service.js"
class QuizController{
    async getQuizClassroom(req,res){
        const {userCreateQuiz,roadmapId, classroomId} = req.query;
        const response = await QuizService.getQuizClassroom({ userCreateQuiz, roadmapId, classroomId });
        res.json(response);
    }
    async updateQuizClassroom(req,res){
        const {quiz} = req.body;
        const {userCreateQuiz, userDoQuiz, roadmapId, classroomId, topics } = quiz;
        const response = await QuizService.updateQuizClassroom({ userCreateQuiz, userDoQuiz, roadmapId, classroomId, topics });
        res.json(response);
    }
    async getQuizById (req,res){
        const {roadmapId,classroomId} = req.query;
        const userDoQuiz = req.authenticate.id;
        const response = await QuizService.getQuizById({userDoQuiz,roadmapId,classroomId});
        res.json(response);
    }
    async doQuiz (req,res){
        const {quiz} = req.body;
         const {userDoQuiz, roadmapId, classroomId, topics } = quiz;
        const response = await QuizService.doQuiz({userDoQuiz, roadmapId, classroomId, topics });
        res.json(response);
    }
}
export default new QuizController(QuizService);