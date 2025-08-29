import RoadmapService from "../services/Roadmap.service.js";
import { Buffer } from 'buffer';
class RoadmapController {

    async createRoadmap(req, res) {
        const { name, description,userId } = req.body;
        const realBuffer = Buffer.from(userId.data);
        const accountId= realBuffer.toString();
        console.log("Account ID:", accountId);
        console.log("Name:", name);
        console.log("Description:", description);
        try {
            const responseCheck = await RoadmapService.checkRoadmap(name, accountId);
            console.log("Response Check:", responseCheck);
            if (!responseCheck.success) {
                return res.json(responseCheck);
            }
            else{
                await RoadmapService.createRoadmap(name, description, accountId);
                res.redirect(`/roadmap/view/:${name}`); 
            }
            
        } catch (error) {
            console.error('Error creating roadmap:', error);
        }
    }
    async editRoadmap(req, res) {
        const { name } = req.params;
        const { description } = req.body;
        await RoadmapService.editRoadmap(name, description);
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
    async getRoadmapByUserId(req, res) {
        const { userId } = req.authenticate.id;
        console.log("Account ID:", userId);
        const roadmaps = await RoadmapService.getRoadmapByUserId(userId);
        res.json(roadmaps);
    }
    async getRoadmapByTeamId(req, res) {
        const { teamId } = req.params;
        const roadmaps = await RoadmapService.getRoadmapByTeamId(teamId);
        res.json(roadmaps);
    }
}
export default new RoadmapController(RoadmapService);