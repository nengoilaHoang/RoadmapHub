import db from '../utils/db.js'
import CheckListAccount from '../models/CheckListAccountSchema.model.js'

class CheckListAccountDAO {
    //====================mongo db
    async createCheckListAccount(accountId, checklistId) {
        const checkListAccount = new CheckListAccount({accountId, checklistId, itemCheckList: []});
        await checkListAccount.save();
    }
    async checkListAccountExists(accountId, checklistId) {
        const existing = await CheckListAccount.findOne({ accountId, checklistId });
        return existing !== null;
    }
    async updateItemCheckList(accountId, checklistId, itemsCheckList) {
        await CheckListAccount.updateOne(
            { accountId, checklistId },
            { $set: { itemsCheckList } }
        );
    }
}

export default new CheckListAccountDAO();