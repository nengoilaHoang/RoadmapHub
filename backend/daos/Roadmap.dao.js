import db from '../utils/db.js'
import connectDB from '../utils/dbmongo.js';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Roadmap from '../models/Roadmap.model.js';
import NodeFactory from '../models/NodeFactory.model.js';
import geneUUID from '../Helps/genUUID.js'; 
import RoadmapSchemaModel from '../models/RoadmapSchema.model.js';
class RoadmapDAO {
    async createRoadmap(name, description, accountId) {
        const roadmap = new Roadmap(geneUUID(),accountId,null,name, description,null, null, null);
        await db('roadmap').insert(roadmap);
        return {
                success:true,
                message:'Create roadmap successfully'
        }
    }
    async editRoadmap(name, description,accountId,roadmapId) {
        await db('roadmap').where({ accountId:accountId,id:roadmapId }).update({ name:name, description:description });
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
    async editNodeRoadmap(accountId,name,nodes,edges) {
        console.log("lll",accountId,name,nodes,edges); 
        await connectDB();
        const roadmap = RoadmapSchemaModel({accountId,name,nodes,edges});
        await roadmap.save();
    }
    async getRoadmapByUserId(accountId) {
        const rows = await db('roadmap')
        .join('account', 'roadmap.accountId', 'account.id')
        .where('account.id', accountId)
        .select('roadmap.*');
        console.log("rows: ", rows);
        if (rows.length === 0) {
            return null;
        }
        else{
            return rows.map(row => Roadmap.fromRow(row));
        }
    }
    async getRoadmapByTeamId(teamId) {
        await db('roadmap')
        .join('team', 'roadmap.teamId', 'team.id')
        .where('team.id', teamId)
        .select('roadmap.*');
    }
    async getRoadmapByName(accountId,name) {
        const roadmap = await db('roadmap').where({accountId:accountId, name:name }).first();
        return roadmap;
    }
}
export default new RoadmapDAO();