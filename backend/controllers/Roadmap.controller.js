import RoadmapService from "../services/Roadmap.service.js";
import { Buffer } from 'buffer';
class RoadmapController {

    async createRoadmap(req, res) {
        const { name, description,accountId } = req.body;
        const responseCheck = await RoadmapService.checkRoadmap(name, accountId);
        if (!responseCheck.success) {
                res.json(responseCheck);
            }
        else{
                const response = await RoadmapService.createRoadmap(name, description, accountId);
                res.json(response);
            }
    }
    async editRoadmap(req, res) {
        const { name,description,accountId,roadmapId} = req.body;
        const responseCheck = await RoadmapService.checkRoadmap(name, accountId);
        console.log("Response Check:", responseCheck);
        if (!responseCheck.success) {
                res.json(responseCheck);
            }
        else{
                const response = await RoadmapService.editRoadmap(name, description,accountId,roadmapId);
                res.json(response);
            }
        
    }
    async deleteRoadmap(req, res) {
        const { name } = req.params;
        await RoadmapService.deleteRoadmap(name);
    }
    async editNodeRoadmap(req, res) {
        const { nodes,edges } = req.body;
        console.log("nodes",nodes);
        console.log("edges",edges);
        await RoadmapService.editNodeRoadmap(nodes,edges);
    }
    async getRoadmapByName(req, res) {
        const { name } = req.params;
        const {accountId}  = req.query;
        const roadmap = await RoadmapService.getRoadmapByName(accountId,name);
        res.json(roadmap);
    }
}
export default new RoadmapController(RoadmapService);