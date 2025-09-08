export default class LearnTopic{

    constructor(id, accountId, topicId, topicProgress)
    {
        this.id = id;
        this.accountId = accountId;
        this.topicId = topicId;
        this.topicProgress = topicProgress;
    }
    static learnTopic(row){
        return new LearnTopic(row.id, row.accountId, row.topicId, row.topicProgress);
    }
    static fromRow(row) {
        return new LearnTopic(row.id, row.accountId, row.topicId, row.LearnTopic);
    }
}