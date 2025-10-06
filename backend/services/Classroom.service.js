import ClassroomDAO from '../daos/Classroom.dao.js'
class ClassroomService{
    constructor(classroomDAO){
        this.ClassroomDAO = classroomDAO;
    }
    async createClassroom(name, description, accountId) {
            return await ClassroomDAO.createClassroom(name, description, accountId);
    }
    async checkClassroom(name, accountId) {
            return await ClassroomDAO.checkClassroom(name, accountId);
    }
    async getNameAll(accountId){
        return await ClassroomDAO.getNameAll(accountId);
    }
    async addRoadmapIntoClass(accountId,roadmapId,classroomId){
        return await ClassroomDAO.addRoadmapIntoClass(accountId,roadmapId,classroomId);
    }
    async getRoadmapInClass(classroomId){
        return await ClassroomDAO.getRoadmapInClass(classroomId);
    }
    async getLearningClass(accountId){
        return await ClassroomDAO.getLearningClass(accountId);
    }
    async getTeachingClass(accountId){
        return await ClassroomDAO.getTeachingClass(accountId);
    }
    async checkLearningClass(accountId,classroomId){
        return await ClassroomDAO.checkLearningClass(accountId,classroomId);
    }
}
export default new ClassroomService(ClassroomDAO)