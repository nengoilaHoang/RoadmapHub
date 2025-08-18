import AccountDAO from '../daos/Account.dao.js';
class AccountService {
    constructor(accountDAO) {
        this.AccountDAO = accountDAO;
    }

    async getAllAccounts() {
        return await AccountDAO.getAccountAll();
    }

    async login(userName, passWord) {
        return await AccountDAO.getAccount(userName, passWord);
    }

    async createAccount (email, username, password){
        return await AccountDAO.createAccount(email,username,password);
    }
    async checkExitAccount(email){
        return await AccountDAO.checkExitAccount(email);
    }

    async updateAccount(id, passWord) {
        return await AccountDAO.updateAccount(id,passWord);
    }

    async deleteAccount(id) {
        return await AccountDAO.deleteAccount(id);
    }
}
export default new AccountService(AccountDAO)