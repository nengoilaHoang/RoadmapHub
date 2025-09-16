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
}
export default new ClassroomService(ClassroomDAO)