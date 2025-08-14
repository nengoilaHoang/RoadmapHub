import AccountDAO from '../daos/Account.dao.js';
export default class AccountService {
    constructor(accountDAO) {
        this.accountDAO = accountDAO;
    }

    async getAllAccounts() {
        return await this.accountDAO.getAccountAll();
    }

    async login(userName, passWord) {
        return await this.accountDAO.getAccount(userName, passWord);
    }

    async createAccount(userName, passWord, name) {
        return await this.accountDAO.createAccount(userName, passWord, name);
    }

    async updateAccount(id, passWord) {
        return await this.accountDAO.updateAccount(id,passWord);
    }

    async deleteAccount(id) {
        return await this.accountDAO.deleteAccount(id);
    }
}