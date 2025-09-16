import ClassroomService from "../services/Classroom.service.js"
class ClassroomController{
    async createClassroom(req, res) {
            const { name, description,accountId } = req.body;
            const responseCheck = await ClassroomService.checkClassroom(name, accountId);
            if (!responseCheck.success) {
                    res.json(responseCheck);
                }
            else{
                    const response = await ClassroomService.createClassroom(name, description, accountId);
                    res.json(response);
                }
    }
    async checkYourClassroom(req,res){
            if(req.authenticate?.id == null){
                res.json({
                    success:false,
                    message:"Classroom is not yours"
                });
            }
            const{name} = req.body;
            const accountId = req.authenticate.id
            const responseCheck = await ClassroomService.checkClassroom(name, accountId);
            if (!responseCheck.success) {
                    res.json({
                        success:true,
                        message:"Classroom is yours"
    
                    });
                }
            else{
                    res.json({
                        success:false,
                        message:"Classroom is not yours"
                    });
                }
    }
    async getNameAll(req,res){
        const accountId = req.authenticate.id
        const response = await ClassroomService.getNameAll(accountId);
        res.json(response);
    }
}
export default new ClassroomController(ClassroomService)