import RoadmapDAO from '../daos/Roadmap.dao.js';
class RoadmapService {
    constructor(roadmapDAO) {
        this.RoadmapDAO = roadmapDAO;
    }

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
    async editNodeRoadmap(accountId,name,nodes, edges,id) {
        return await RoadmapDAO.editNodeRoadmap(accountId,name,nodes, edges,id);
    }
    async getRoadmapByName(accountId,name) {
        return await RoadmapDAO.getRoadmapByName(accountId,name);
    }
    async getRoadmapByUserId(userId) {
        return await RoadmapDAO.getRoadmapByUserId(userId);
    }
    async getRoadmapByTeamId(teamId) {
        return await RoadmapDAO.getRoadmapByTeamId(teamId);
    }
    async getTopicRoadmapByUserId(id){
        return await RoadmapDAO.getTopicRoadmapByUserId(id);
    }
}
export default new RoadmapService(RoadmapDAO)