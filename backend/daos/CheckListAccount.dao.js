import db from '../utils/db.js'
import CheckListAccount from '../models/CheckListAccountSchema.model.js'

class CheckListAccountDAO {
    //====================mongo db
    async createCheckListAccount(accountId, roadmapId, checklistId) {
        const checkListAccount = new CheckListAccount({accountId, roadmapId, checklistId, itemsCheckList: []});
        await checkListAccount.save();
    }
    async checkListAccountExists(accountId, checklistId) {
        const existing = await CheckListAccount.findOne({ accountId, checklistId });
        return existing !== null;
    }
    async getCheckListAccountByRoadmapId(accountId, roadmapId) {
        console.log("DAO - getCheckListAccountByRoadmapId:", accountId, roadmapId);
        return await CheckListAccount.findOne({ accountId, roadmapId });
    }
    async updateItemCheckList(accountId, checklistId, itemsCheckList) {
        await CheckListAccount.updateOne(
            { accountId, checklistId },
            { $set: { itemsCheckList } }
        );
    }
}

export default new CheckListAccountDAO();