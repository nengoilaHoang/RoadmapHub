import RoadmapDAO from '../daos/Roadmap.dao.js';
class RoadmapService {
    constructor(roadmapDAO) {
        this.RoadmapDAO = roadmapDAO;
    }

    async createRoadmap(name, description, accountId) {
        return await RoadmapDAO.createRoadmap(name, description, accountId);
    }
    async editRoadmap(name, description) {
        return await RoadmapDAO.editRoadmap(name, description);
    }
    async deleteRoadmap(name) {
        return await RoadmapDAO.deleteRoadmap(name);
    }
    async checkRoadmap(name, accountId) {
        return await RoadmapDAO.checkRoadmap(name, accountId);
    }
    async editNodeRoadmap(nodes, edges) {
        return await RoadmapDAO.editNodeRoadmap(nodes, edges);
    }
    async getRoadmapByUserId(userId) {
        return await RoadmapDAO.getRoadmapByUserId(userId);
    }
    async getRoadmapByTeamId(teamId) {
        return await RoadmapDAO.getRoadmapByTeamId(teamId);
    }
}
export default new RoadmapService(RoadmapDAO)