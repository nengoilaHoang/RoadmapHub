import db from '../utils/db.js'
import { v4 as uuidv4 } from 'uuid';
import Roadmap from '../models/Roadmap.model.js';
class RoadmapDAO {
    async createRoadmap(name, description, accountId) {
        const roadmap = new Roadmap(Buffer.from(uuidv4().replace(/-/g, ''), 'hex'),accountId,"",name, description);
        await db('roadmap').insert(roadmap);
        return {
                success:true,
                message:'Create roadmap successfully'
        }
    }
    async editRoadmap(name, description) {
        await db('roadmap').where({ name }).update({ name:name, description:description });
        return {
            success: true,
            message: 'Edit roadmap successfully'
        }
    }
    async deleteRoadmap(name) {
        await db('roadmap').where({ name }).del();
        return {
            success: true,
            message: 'Delete roadmap successfully'
        }
    }
}
export default new RoadmapDAO();