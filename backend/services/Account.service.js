import AccountDAO from '../daos/Account.dao.js';
class AccountService {
    constructor(accountDAO) {
        this.AccountDAO = accountDAO;
    }

    async getAllAccounts() {
        return await AccountDAO.getAccountAll();
    }

    async getPassWord(email) {
        return await this.AccountDAO.getPassWord(email);
    }

    async login(email, passWord) {
        return await this.AccountDAO.getAccount(email, passWord);
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
    async getRefreshTokenById(accountId) {
        return await this.AccountDAO.getRefreshTokenById(accountId);
    }

    async setRefreshToken(accountId, refreshToken) {
        return await this.AccountDAO.setRefreshToken(accountId, refreshToken);
    }
}
export default new AccountService(AccountDAO)
