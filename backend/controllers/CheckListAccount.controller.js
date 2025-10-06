import CheckListAccountService from "../services/CheckListAccount.service.js";
class CheckListAccountController {
    async changeItemCheckList(req, res) {
        try {
            const {checkListSelected, roadmapId} = req.body;
            const accountId = req.authenticate.id;
            ////console.log(checkListSelected, roadmapId, accountId);
            const checkExit = await CheckListAccountService.checkListAccountExists(accountId, checkListSelected?.id); 
            if(!checkExit){
                await CheckListAccountService.createCheckListAccount(accountId, roadmapId, checkListSelected?.id);
                return res.status(200).json({message: "Create checklist account successfully"});
            }
            else{
                await CheckListAccountService.updateItemCheckList(accountId, checkListSelected.id, checkListSelected?.data?.itemsCheckList);
                ////console.log(checkListSelected?.data?.itemsCheckList);
                return res.status(200).json({message: "Update checklist account successfully"});
            }
        } catch (error) {
            console.error("Error in changeItemCheckList:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
export default new CheckListAccountController();