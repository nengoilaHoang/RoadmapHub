import genUUID from '../Helps/genUUID.js';
import Classroom from '../models/Classroom.model.js'
import db from '../utils/db.js'
class ClassroomDAO{
    async getNameAll(accountId){
        const rows = await db('classroom').where({teacherId:accountId});
        return rows.map(Classroom.fromRow);
    }
    async getAll() {
        const rows = await db('post as p')
            .leftJoin('comment as c', 'c.postId', 'p.id')
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
            .where('p.classroomId', classroomId)
            .orderBy([{ column: 'p.createDate', order: 'desc' }, { column: 'c.createDate', order: 'asc' }]);

        return rows;

    }
    async createClassroom(name, description, accountId) {
            const teacherId = accountId;
            const id = genUUID()
            const classroom = new Classroom(id,teacherId,name, description);
            await db('classroom').insert(classroom);
            return {
                    success:true,
                    classroomId:id,
                    message:'Create classroom successfully'
            }
    }
    async checkClassroom(name,accountId){
            const teacherId = accountId;
            const exit = await db('classroom').where({name,teacherId}).first();
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
}
export default new ClassroomDAO();