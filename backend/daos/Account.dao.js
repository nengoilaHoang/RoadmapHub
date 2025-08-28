import db from '../utils/db.js'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import Account from '../models/Account.model.js';
import genUUID from '../Helps/genUUID.js';

class AccountDAO {
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

    async getPassWord(email) {
        const row = await db('account')
            .where({ email })
            .select('password')
            .first();
        return row ? row.password : null;
    }

    async createAccount(email,username, password) {
        try{
            const hashedPassword = await bcrypt.hash(password, 10);
            const account = new Account(genUUID(), username, email, hashedPassword, 1);
            console.log("Account to be created:", account);
            const result = await db('account').insert(account);
            return {
                    success:true,
                    message:'Create account successfully'
            }
        }
        catch(e){
            console.log(e);
        }
        
    }
    async checkExitAccountEmail(email){
        const exit = await db('account').where({email}).first();
        if(exit){
            return {
                success:false,
                message:"Email already registered"
            }
        }
        else {
             return{
                success:true,
                message:"Email is not registered"
            }
        }
    }
    async checkExitAccountUsername(username){
        const exit = await db('account').where({username}).first();
        if(exit){
            return {
                success:false,
                message:"Username already registered"
            }
        }
        else {
             return{
                success:true,
                message:"Username is not registered"
            }
        }
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
    async getRefreshTokenById(accountId) {
        const row = await db('account')
            .where({ id: accountId })
            .select('refreshToken')
            .first();
        return row ? row.refreshToken : null;
    }
    async setRefreshToken(accountId, refreshToken) {
        const rows = await db('account')
            .where({ id: accountId })
            .update({ refreshToken });
        return rows > 0;
    }
    async getAccountByEmail(email) {
        const row = await db('account')
            .where({ email })
            .first();
        return row ? Account.fromRow(row) : null;
    }
    async changePassword(email, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const rows = await db('account')
            .where({ email })
            .update({ password: hashedPassword });
        return rows > 0;
    }
    async changeEmail(oldEmail, newEmail) {
        const rows = await db('account')
            .where({ email: oldEmail })
            .update({ email: newEmail });
        return rows > 0;
    }
}
export default new AccountDAO()