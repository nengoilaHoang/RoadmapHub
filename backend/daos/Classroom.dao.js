import genUUID from '../Helps/genUUID.js';
import Classroom from '../models/Classroom.model.js'
import db from '../utils/db.js'
class ClassroomDAO{
    async getNameAll(accountId){
        const rows = await db('Classroom').where({teacherId:accountId});
        return rows.map(Classroom.fromRow);
    }
    async getAll() {
        const rows = await db('Post as p')
            .leftJoin('Comment as c', 'c.postId', 'p.id')
            .select(
                'p.id as postId',
                'p.title',
                'p.content as postContent',
                'p.createDate as postDate',
                'c.id as commentId',
                'c.content as commentContent',
                'c.createDate as commentDate',
                'c.repCommentId'
            )
            .where('p.ClassroomId', classroomId)
            .orderBy([{ column: 'p.createDate', order: 'desc' }, { column: 'c.createDate', order: 'asc' }]);

        return rows;

    }
    async createClassroom(name, description, accountId) {
            const teacherId = accountId;
            const id = genUUID()
            const classroom = new Classroom(id,teacherId,name, description);
            await db('Classroom').insert(classroom);
            return {
                    success:true,
                    classroomId:id,
                    message:'Create classroom successfully'
            }
    }
    async checkClassroom(name,accountId){
            const teacherId = accountId;
            const exit = await db('Classroom').where({name,teacherId}).first();
            if(exit){
                return {
                    success:false,
                    message:"Name of classroom already taken"
                }
            }
            else {
                 return{
                    success:true,
                    message:"Classroom already created successfully"
                }
            }
    }
    async addRoadmapIntoClass(accountId,roadmapId,classroomId){
        await db('Classroom').where({teacherId:accountId,id:classroomId}).update({roadmapId:roadmapId});
        return {
            success:true,
            message:'Add roadmap into classroom successfully'
        }
    }
    async getRoadmapInClass(classroomId){
        const classroom = await db('Classroom').where({id:classroomId});
        return classroom;
    }
    async getLearningClass(accountId){
        const rows = await db('Classroom')
                        .leftJoin('StudentClassroom','StudentClassroom.classroomId','Classroom.id')
                        .select('*')
                        .where({"StudentClassroom.studentId":accountId});
        return rows;
    }
    async getTeachingClass(accountId){
        const rows = await db('Classroom')
                           .where('teacherId',accountId);
        return rows;
    }
    async checkLearningClass(accountId,classroomId){
        const studentId = accountId;
        const check = await db('StudentClassroom').where({studentId,classroomId:classroomId}).first();
        if(check){
            return {
                success:true,
                message:"You are already learning this class"
            }
        }
        return {
            success:false,
            message:"You are not learning this class"
        }
    }
}
export default new ClassroomDAO();