import StudentClassroomService from '../services/StudentClassroom.service.js'
import AccountService from "../services/Account.service.js";
class StudentClassroomController{
    async getAll(req,res)
    {
        const {classroomId} = req.query;
        const response  = await StudentClassroomService.getAll(classroomId);
        res.json(response);  
    }
    async addStudent(req,res){
        const {classroomId,email} = req.body;
        const account = await AccountService.getAccountByEmail(email);
        if(account === null) res.json({
            success:false,
            message:"Account is not exit"
        })
        const response  = await StudentClassroomService.addStudent(classroomId,account.id);
        res.json(response)
    }
    async removeStudent(req,res){
        
        const {classroomId,studentId} = req.body;
        const response  = await StudentClassroomService.removeStudent(classroomId,studentId);
        res.json(response)
    }

}
export default new StudentClassroomController(StudentClassroomService)