import db from '../utils/db.js'
import Account from '../models/Account.model.js'

export default class AccountDAO {
    async getAccountAll(){
        const rows = await db('account').select('*');
        return rows.map(Account.fromRow);
    }
    async getAccount(userName, passWord) {
        const row = await db('account')
            .where({
                username: userName,
                password: passWord
            })
            .first();
        return row ? Account.fromRow(row) : null;
    }
    async createAccount(userName, passWord, name) {
        const account = new Account(null, userName, passWord, name);
        const [id] = await db('account').insert({userName, passWord, name});
        account.id = id;
        return account;
    }
    async updateAccount(id, passWord) {
        const rows = await db('account')
            .where({ id })
            .update({ password:passWord });
        if (rows === 0) {
            return null;
        }
        return this.getAccountById(id);
    }
    async deleteAccount(id) {
        const rows = await db('account').where({ id }).del();
        return rows > 0;
    }
}