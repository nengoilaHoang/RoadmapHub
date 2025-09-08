import LearnTopicService from "../services/LearnTopic.service.js";
import LearnTopic from "../models/LearnTopic.model.js";
import geneUUID from "../Helps/genUUID.js";
class LearnTopicController {
    getLearnTopic = async (req, res, next) => {
        try {
            const {topicId} = req.params;
            const userId = req.authenticate.id;
            console.log("in controller: ",userId, topicId);
            const learnTopic = await LearnTopicService.getLearnTopic(userId,topicId);
            if (!!learnTopic) {
                return res.status(200).json({success: true, learnTopic});
            }
            return res.status(200).json({success: false});
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };
    async getNodesWithTopicStatus(req, res, next){
        try {
            const {nodes} = req.body;
            const accountId = req.authenticate.id
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    async getNodesWithTopicStatus(req, res, next) {
        try {
            const { nodes } = req.body;
            const accountId = req.authenticate.id;
            // Dùng Promise.all để chạy song song nhanh hơn
            const updatedNodes = await Promise.all(
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
            return res.status(200).json({ success: true, nodes: updatedNodes });
        }catch (error) {
            console.error("Error in getNodesWithTopicStatus:", error);
            return res.status(500).json({success: false, error: "Internal server error" });
        }
    }
    createLearnTopic = async (req, res, next) => {
        const {topicId, process} = req.body;
        const userId = req.authenticate.id;
        const learnTopic = new LearnTopic(geneUUID(), userId, topicId, process);
        await LearnTopicService.createLearnTopic(learnTopic);
    };
    updateLearnTopic = async (req, res, next) => {
        const {topicId, process} = req.body;
        const userId = req.authenticate.id;
        const learnTopic = new LearnTopic(null, userId, topicId, process);
        await LearnTopicService.updateLearnTopic(learnTopic);
    };
    deleteLearnTopic = async (req, res, next) => {
        const {topicId} = req.body;
        const userId = req.authenticate.id;
        const learnTopic = new LearnTopic(null, userId, topicId, null);
        await LearnTopicService.deleteLearnTopic(learnTopic);
    };
}
export default new LearnTopicController();
