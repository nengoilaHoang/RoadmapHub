import db from '../utils/db.js'
import connectDB from '../utils/dbmongo.js';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Roadmap from '../models/Roadmap.model.js';
import NodeFactory from '../models/NodeFactory.model.js';
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
    async checkRoadmap(name,accountId){
        const exit = await db('roadmap').where({name,accountId}).first();
        if(exit){
            return {
                success:false,
                message:"Name of roadmap already taken"
            }
        }
        else {
             return{
                success:true,
                message:"Roadmap already created successfully"
            }
        }
    }
    async editNodeRoadmap(nodes,edges) {
        console.log("lll",nodes,edges); 
        
        await connectDB();
        const Edge = mongoose.model("edges", new mongoose.Schema({
        source: String,
        target: String
    },{ versionKey: false }));

        const edge = new Edge({ source: "node1", target: "node2" });
        await Edge.create(edge);

        const Edges = await Edge.find();
        console.log(edges);
    }
    async getRoadmapByUserID(accountId) {
        await db('roadmap')
        .join('account', 'roadmap.accountId', 'account.id')
        .where('account.id', accountId)
        .select('roadmap.*');
    }
    async getRoadmapByTeamID(teamId) {
        await db('roadmap')
        .join('team', 'roadmap.teamId', 'team.id')
        .where('team.id', teamId)
        .select('roadmap.*');
    }
}
export default new RoadmapDAO();