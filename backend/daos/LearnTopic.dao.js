import db from '../utils/db.js'
import LearnTopic from '../models/LearnTopic.model.js';
import geneUUID from '../Helps/genUUID.js';

class learnTopicDAO{
    //get
    async getLearnTopic(accountId, topicId){
        ////console.log("in DAO: ",accountId, topicId);
        const learnTopic = await db('LearnTopic')
            .where({accountId: accountId, topicId: topicId})
            .first();
        return learnTopic;
    }
    //CRUD
    async createLearnTopic(learnTopic){
        await db('LearnTopic')
            .insert(learnTopic);
    }
    async updateLearnTopic(learnTopic){
        await db('LearnTopic')
            .where({accountId: learnTopic.accountId, topicId: learnTopic.topicId })
            .update({topicProgress: learnTopic.topicProgress});
    }
    async deleteLearnTopic(learnTopic){
        await db('LearnTopic')
            .where({accountId: learnTopic.accountId, topicId: learnTopic.topicId })
            .delete();
    }
}

export default new learnTopicDAO();