import genUUID from '../Helps/genUUID.js';
import StudentClassroom from '../models/StudentClassroom.model.js'
import db from '../utils/db.js'
class StudentClassroomDAO{
    async getAll(classroomId){
        const rows = await db('Profile as p')
        .join('StudentClassroom as sc', 'p.accountId', 'sc.studentId')
        .select('p.accountId','p.fullname', 'p.github', 'p.linkedin', 'p.avatar')
        .where('sc.classroomId', classroomId);
        return rows;
    }
    async addStudent(classroomId,studentId){
        const student = new StudentClassroom(genUUID(),classroomId,studentId);
        await db('StudentClassroom').insert(student);
        return({
            success:true,
            message:"Add student in class successfully"
        })
    }
    async removeStudent(classroomId,studentId){
        await db('StudentClassroom').where({classroomId:classroomId,studentId:studentId}).delete();
         return({
            success:true,
            message:"Remove student in class successfully"
        })
    }



}
export default new StudentClassroomDAO();