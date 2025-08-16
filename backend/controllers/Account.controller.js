import AccountService from "../services/Account.service.js";
import AccountDAO from "../daos/Account.dao.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const accountService = new AccountService(new AccountDAO());
export default class AccountController {
    static login = async (req,res,nex)=>{
        console.log("Login request received", req.body);
        const {userName, passWord} = req.body;
        if(!userName || !passWord) {
            return {status: false, message: "Username and password are required"};
        }
        const account = await accountService.login(userName, passWord)
        if(!account) {
            return res.status(401).json({status: false, message: "Invalid username or password"});
        }
        else {
            // Tạo payload cho token
            const payload = {
                id: account.id,
                userName: account.userName,
                email: account.email
            };
             // Ký token (expiresIn = thời hạn, ví dụ 1h)
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({status: true, message: "Login successful", account, token});
        }
    }
}