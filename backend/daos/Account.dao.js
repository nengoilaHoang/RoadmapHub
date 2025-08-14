import db from '../utils/db.js'

import Account from '../models/Account.model.js'

export default class AccountDAO {
    async getAccountAll(){
        const rows = await db('users').select('*');
        return rows.map(Account.fromRow);
    }
    async getAccount(userName, passWord) {
        const rows = await db('users').where({ userName,passWord }).select('*');
        if (rows.length === 0) {
            return false;
        }
        return true;
    }
    async createAccount(userName, passWord, name) {
        const account = new Account(null, userName, passWord, name);
        const [id] = await db('users').insert({userName, passWord, name});
        account.id = id;
        return account;
    }
    async updateAccount(id, passWord) {
        const rows = await db('users')
            .where({ id })
            .update({ password:passWord });
        if (rows === 0) {
            return null;
        }
        return this.getAccountById(id);
    }
    async deleteAccount(id) {
        const rows = await db('users').where({ id }).del();
        return rows > 0;
    }
}