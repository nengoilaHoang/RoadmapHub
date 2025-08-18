import db from '../utils/db.js'
import Account from '../models/Account.model.js'

export default class AccountDAO {
    async getAccountAll(){
        const rows = await db('account').select('*');
        return rows.map(Account.fromRow);
    }
    async getAccount(email, passWord) {
        const row = await db('account')
            .where({
                email: email,
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
    async savePinForAccount(accountId, hashedPin, pinExpire) {
        const rows = await db('account')
            .where({ id: accountId })
            .update({ pin: hashedPin, pinExpire: pinExpire });
        return rows > 0;
    }
    async getHashedPinForAccount(accountId) {
        const row = await db('account')
            .where({ id: accountId })
            .select('pin')
            .first();
        return row ? row.pin : null;
    }
}