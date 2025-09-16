import StudentClassroomDAO from '../daos/StudentClassroom.dao.js'
class StudentClassroomService{
    constructor(StudentClassroomDAO){
        this.StudentClassroomDAO = StudentClassroomDAO;
    }
    async getAll(classroomId){
        return await StudentClassroomDAO.getAll(classroomId);
    }
    async addStudent(classroomId,studentId){
        return await StudentClassroomDAO.addStudent(classroomId,studentId);
    }
    async removeStudent(classroomId,studentId){
        return await StudentClassroomDAO.removeStudent(classroomId,studentId);
    }
}
export default new StudentClassroomService(StudentClassroomDAO)