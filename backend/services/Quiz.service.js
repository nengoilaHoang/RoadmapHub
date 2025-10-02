import QuizDAO from "../daos/Quiz.dao.js"
class QuizService{
   
    async getQuizClassroom({ userCreateQuiz, roadmapId, classroomId }){
            return await QuizDAO.getQuizClassroom({ userCreateQuiz, roadmapId, classroomId});
        }
    async updateQuizClassroom({userCreateQuiz, userDoQuiz, roadmapId, classroomId, topics}){
            return await QuizDAO.updateQuizClassroom({ userCreateQuiz, userDoQuiz, roadmapId, classroomId, topics });
        }
    async getQuizById({userDoQuiz,roadmapId,classroomId}){
        return await QuizDAO.getQuizById({userDoQuiz,roadmapId,classroomId});
    }
    async doQuiz({userDoQuiz, roadmapId, classroomId, topics}){
        return await QuizDAO.doQuiz({userDoQuiz, roadmapId, classroomId, topics});
    }
}
export default new QuizService(QuizDAO);