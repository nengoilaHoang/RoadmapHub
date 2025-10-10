import AccountDAO from "../daos/Account.dao.js";
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

  async createAccount(email, username, password) {
    //console.log("accout service recieived",email, username, password);
    return await AccountDAO.createAccount(email, username, password);
  }
  async checkExitAccountEmail(email) {
    return await AccountDAO.checkExitAccountEmail(email);
  }
  async checkExitAccountUsername(username) {
    return await AccountDAO.checkExitAccountUsername(username);
  }

  async updateAccount(id, passWord) {
    return await AccountDAO.updateAccount(id, passWord);
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

  async getAccountByEmail(email) {
    return await this.AccountDAO.getAccountByEmail(email);
  }
  async changePassword(email, newPassword) {
    return await this.AccountDAO.changePassword(email, newPassword);
  }
  async changeEmail(oldEmail, newEmail) {
    ////console.log("Changing email from", oldEmail, "to", newEmail);
    return await this.AccountDAO.changeEmail(oldEmail, newEmail);
  }

  // OAuth2 Methods
  async createGoogleAccount(data) {
    return await this.AccountDAO.createGoogleAccount(data);
  }

  async updateGoogleId(accountId, googleId) {
    return await this.AccountDAO.updateGoogleId(accountId, googleId);
  }

  async getAccountByGoogleId(googleId) {
    return await this.AccountDAO.getAccountByGoogleId(googleId);
  }
}
export default new AccountService(AccountDAO);
