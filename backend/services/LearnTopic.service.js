import LearnTopicDao from "../daos/LearnTopic.dao.js";

class LearnTopicService{
    constructor(LearnTopicDao){
        this.LearnTopicDao = LearnTopicDao;
    }
    async getLearnTopic(accountId, topicId){
        return await LearnTopicDao.getLearnTopic(accountId, topicId);
    }
    async createLearnTopic(learnTopic){
        await LearnTopicDao.createLearnTopic(learnTopic);
    }
    async updateLearnTopic(learnTopic){
        await LearnTopicDao.updateLearnTopic(learnTopic);
    }
    async deleteLearnTopic(learnTopic){
        await LearnTopicDao.deleteLearnTopic(learnTopic);
    }
}

export default new LearnTopicService(LearnTopicDao);