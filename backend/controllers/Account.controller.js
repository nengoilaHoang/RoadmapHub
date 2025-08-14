import AccountService from "../services/Account.service.js";

export default class AccountController {
    
    static login = async (req,res,nex)=>{
        console.log("Login request received", req.body);
        const {userName, passWord} = req.body;
        if(!userName || !passWord) {
            return {status: false, message: "Username and password are required"};
        }
        return await AccountService.login(userName, passWord)
    }
}