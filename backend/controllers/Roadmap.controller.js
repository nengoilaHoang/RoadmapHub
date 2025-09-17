import RoadmapService from "../services/Roadmap.service.js";
import LearnTopicService from "../services/LearnTopic.service.js";
import CheckListAccountService from "../services/CheckListAccount.service.js";
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
        const { name,nodes,edges } = req.body;
        const accountId = req.authenticate.id
        try {
            const findRoadmap = await RoadmapService.checkRoadmapExist(accountId, name);
            console.log("findRoadmap: ",findRoadmap);
            if(findRoadmap){ 
                await RoadmapService.updateRoadmap(accountId,name,nodes,edges);
            }
            else{
                const roadmap = await RoadmapService.getRoadmapByAccountIdAndName(accountId,name);
                console.log("roadmap in my sql", roadmap);
                await RoadmapService.editNodeRoadmap(accountId,name,roadmap.id,nodes,edges);
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getRoadmapByName(req, res) {
        const { name } = req.params;
        const {accountId}  = req.query;
        const roadmap = await RoadmapService.getRoadmapByName(accountId,name);
        res.json(roadmap);
    }
    async getRoadmapByAccountIdAndName(req,res){
        const {name} = req.params;
        const accountId = req.authenticate.id;
        const roadmap = await RoadmapService.getRoadmapByAccountIdAndName(accountId,name);
        res.json(roadmap);
    }
    async checkYourRoadmap(req,res){
        const{name} = req.body;
        const accountId = req.authenticate.id
        const responseCheck = await RoadmapService.checkRoadmap(name, accountId);
          if (!responseCheck.success) {
                res.json({
                    success:true,
                    message:"Roadmap is your user"

                });
            }
        else{
                res.json({
                    success:false,
                    message:"Roadmap is not your user"

                });
            }
    }
    async getRoadmapByUserId(req, res) {
        const userId = req.authenticate.id;
        console.log("Account ID:", userId);
        const roadmaps = await RoadmapService.getRoadmapByUserId(userId);
        console.log("Roadmaps:", roadmaps);
        res.json({status: "success", data: roadmaps});
    }
    async getRoadmapByTeamId(req, res) {
        const { teamId } = req.params;
        const roadmaps = await RoadmapService.getRoadmapByTeamId(teamId);
        res.json({status: "success",roadmaps});
    }
    async viewRoadmap(req, res){
        const {roadmapId} = req.params;
        try {
            const roadmap = await RoadmapService.viewRoadmap(roadmapId);
            return res.json({status: "success", roadmap});
        } catch (error) {
            console.log(error);
            return res.json({status: "failed", error});
        }
    }
    async viewRoadmapPublic(req, res){
        const {roadmapId} = req.params;
        try {
            const roadmap = await RoadmapService.viewRoadmap(roadmapId);
            const nodes = roadmap.nodes;
            const accountId = req.authenticate.id;
            const nodesWithStatus = await Promise.all(
                nodes.map(async (node) => {
                    if (node.type === "topic") {
                        const learnTopic = await LearnTopicService.getLearnTopic(accountId, node.id);
                        if (learnTopic) {
                            return { ...node,selected:false,data:{...node.data, topicStatus: learnTopic.topicProgress }};
                        }
                    }
                    return node;
                })
            );
            const roadmapWithStatus = {...roadmap, nodes: nodesWithStatus};
            const roadmapWithStatusAndCheckList = await CheckListAccountService.getCheckListAccountByRoadmapId(accountId, roadmapId, roadmapWithStatus);
            return res.json({status: "success", roadmap: {...roadmapWithStatusAndCheckList, edges: roadmap.edges}});
        } catch (error) {
            console.log(error);
            return res.json({status: "failed", error});
        }
    }
}
export default new RoadmapController(RoadmapService);