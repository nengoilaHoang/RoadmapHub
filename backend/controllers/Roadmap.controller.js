import RoadmapService from "../services/Roadmap.service.js";
class RoadmapController {

    async createRoadmap(req, res) {
        const { name, description } = req.body;
        const accountId = req.user.id; // Assuming user ID is stored in req.user after authentication
        try {
            await RoadmapService.createRoadmap(name, description, accountId);
            res.redirect(`/roadmap/view/:${name}`); // Redirect to the newly created roadmap view page
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
}
export default new RoadmapController(RoadmapService);