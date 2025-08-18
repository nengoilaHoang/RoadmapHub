import db from '../utils/db.js'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import Account from '../models/Account.model.js';

class AccountDAO {
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
    async createAccount(email,username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const account = new Account(Buffer.from(uuidv4().replace(/-/g, ''), 'hex'), email, username, hashedPassword, 1);
        const result = await db('account').insert(account);
        return {
                success:true,
                message:'Create account successfully'
        }
        
    }
    async checkExitAccount(email){
        const exit = await db('account').where({email}).first();
        if(exit){
            return {
                succes:false,
                message:'"Email already registered"'
            }
        }
        else {
             return{
                success:true,
                message:'Email is not registered'
            }
        }
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
export default new AccountDAO()