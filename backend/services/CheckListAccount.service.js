import CheckListAccountDao from "../daos/CheckListAccount.dao.js";
class CheckListAccountService {
    async createCheckListAccount(accountId, roadmapId, checklistId) {
        return await CheckListAccountDao.createCheckListAccount(accountId, roadmapId, checklistId);
    }
    async checkListAccountExists(accountId, checklistId) {
        return await CheckListAccountDao.checkListAccountExists(accountId, checklistId);
    }
    async getCheckListAccountByRoadmapId(accountId, roadmapId, roadmap) {
        const checkListAccounts = await CheckListAccountDao.getCheckListAccountByRoadmapId(accountId, roadmapId);
        //console.log("roadmap:", roadmap);
        //console.log("checkListAccounts:", checkListAccounts.itemsCheckList);
        const mergeList = {...roadmap};
        if (!Array.isArray(mergeList.nodes)) {
            mergeList.nodes = [];
        }
        mergeList.nodes = mergeList.nodes.map(node => {
            if (node.type === "checklist" && node.id === checkListAccounts?.checklistId) {
                return{
                    ...node,
                    data:{
                        ...node.data,
                        itemsCheckList: checkListAccounts?.itemsCheckList || []
                    }
                }
            }
            return node;
        })
        return mergeList;
    }
    async updateItemCheckList(accountId, checklistId, itemsCheckList) {
        return await CheckListAccountDao.updateItemCheckList(accountId, checklistId, itemsCheckList);
    }
}
export default new CheckListAccountService();