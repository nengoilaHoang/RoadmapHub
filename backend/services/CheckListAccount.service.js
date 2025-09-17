import CheckListAccountDao from "../daos/CheckListAccount.dao.js";
class CheckListAccountService {
    async createCheckListAccount(accountId, checklistId) {
        return await CheckListAccountDao.createCheckListAccount(accountId, checklistId);
    }
    async checkListAccountExists(accountId, checklistId) {
        return await CheckListAccountDao.checkListAccountExists(accountId, checklistId);
    }
    async updateItemCheckList(accountId, checklistId, itemsCheckList) {
        return await CheckListAccountDao.updateItemCheckList(accountId, checklistId, itemsCheckList);
    }
}
export default new CheckListAccountService();