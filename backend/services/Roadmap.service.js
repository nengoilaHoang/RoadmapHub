import RoadmapDAO from '../daos/Roadmap.dao.js';
class RoadmapService {
    constructor(roadmapDAO) {
        this.RoadmapDAO = roadmapDAO;
    }
    //function service
    async addNoHandleToNodeOfRoadmap(roadmap) {
        if (!Array.isArray(roadmap?.nodes)) {
            roadmap.nodes = [];
        }
        roadmap.nodes = roadmap.nodes.map(node => ({
            ...node,
            data: {
                ...node.data,
                handle: "none"
        }
}));
        return roadmap;
    }
    //====================My sql
    async createRoadmap(name, description, accountId) {
        return await RoadmapDAO.createRoadmap(name, description, accountId);
    }
    async editRoadmap(name, description,accountId,roadmapId) {
        return await RoadmapDAO.editRoadmap(name, description,accountId,roadmapId);
    }
    async deleteRoadmap(name) {
        return await RoadmapDAO.deleteRoadmap(name);
    }
    async checkRoadmap(name, accountId) {
        return await RoadmapDAO.checkRoadmap(name, accountId);
    }
    // async editNodeRoadmap(accountId,name,nodes, edges,id) {
    //     return await RoadmapDAO.editNodeRoadmap(accountId,name,nodes, edges,id);
    // }
    async getRoadmapByName(accountId,name) {
        return await RoadmapDAO.getRoadmapByName(accountId,name);
    }
    async getRoadmapByUserId(userId) {
        return await RoadmapDAO.getRoadmapByUserId(userId);
    }
    async getRoadmapByTeamId(teamId) {
        return await RoadmapDAO.getRoadmapByTeamId(teamId);
    }
    async getRoadmapByAccountIdAndName(accountId, name){
        return await RoadmapDAO.getRoadmapByAccountIdAndName(accountId,name);
    }
    //====================mongoDB
    async editNodeRoadmap(accountId,name,roadmapId,nodes, edges) {
        return await RoadmapDAO.editNodeRoadmap(accountId,name,roadmapId,nodes, edges);
    }
    async viewRoadmap(roadmapId){
        return await RoadmapDAO.viewRoadmap(roadmapId);
    }
    async checkRoadmapExist(accountId, name){
        return await RoadmapDAO.checkRoadmapExist(accountId,name);
    }
    async updateRoadmap(accountId, name, nodes, edges){
        return await RoadmapDAO.updateRoadmap(accountId, name, nodes, edges)
    }
    async getTopicRoadmapByUserId(roadmapId){
        return await RoadmapDAO.getTopicRoadmapByUserId(roadmapId);
    }
}
export default new RoadmapService(RoadmapDAO)