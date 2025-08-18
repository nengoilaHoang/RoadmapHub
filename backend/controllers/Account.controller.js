import AccountService from "../services/Account.service.js";
import AccountDAO from "../daos/Account.dao.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import nodemailer from 'nodemailer';
import { SendEmail } from "../middlewares/SendEmailMiddleWare.js";
dotenv.config();
const accountService = new AccountService(new AccountDAO());
export default class AccountController {
    static login = async (req,res,next)=>{
        console.log("Login request received", req.body);
        const {email, passWord, type} = req.body;
        let account;
        if(type === 'normal'){
                if(!email || !passWord) {
                return res.status(400).json({status: false, message: "Email and password are required"});
            }
            account = await accountService.login(email, passWord)
        }
        else if(type === 'google') {
            // Handle Google login
        }
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
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
            let encodeToken = CryptoJS.AES.encrypt(token, process.env.CRYPTO_SECRET).toString();
            const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
            // Lưu refreshToken vào cơ sở dữ liệu
            const result = await accountService.setRefreshToken(account.id, refreshToken);
            console.log("Update Refresh Token result:", result);
            let encodeRefreshToken = CryptoJS.AES.encrypt(refreshToken, process.env.CRYPTO_SECRET).toString();
            //tạo và hashed mã pin
            const pin = Math.floor(100000 + Math.random() * 900000).toString();
            let hashedPin = await bcrypt.hash(pin, parseInt(process.env.BCRYPT_SALT_ROUNDS));
            // gửi pin qua mail
            const text = `Hi! There, this is your pin code: ${pin}. Please use this pin to verify your login. The pin is valid for 10 minutes. If you did not request this, please ignore this email.`;
            SendEmail(account.email, text);
            //return
            return res.status(200).json({status: true, message: "Login successful", account, hashedPin, encodeToken, encodeRefreshToken});
        }
    };
    static loginVerify = async (req, res, next) => {
        const { hashedPin, encodeToken, encodeRefreshToken, pin } = req.body;
        // Verify the hashedPin
        let validPin = await bcrypt.compare(pin, hashedPin);
        // If valid, log the user in
        if (validPin) {
            // Create a new session or token for the user
            const decodedToken = CryptoJS.AES.decrypt(encodeToken, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
            const decodeRefreshToken = CryptoJS.AES.decrypt(encodeRefreshToken, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
            return res.status(200).json({ status: true, message: "Login successful", decodedToken, decodeRefreshToken });
        }
        // If invalid, return an error response
    };
    static refreshToken = async (req, res, next) => {
        const { refreshToken } = req.body;
        //const payload = jwt.decode(refreshToken);
        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
        //const idString = payload.id;
        const bufData = payload.id.data;
        const idString = Buffer.from(bufData).toString('utf-8');
        const refreshTokenFromDB = await accountService.getRefreshTokenById(idString);
        //Verify the refresh token and issue a new access token
        if (refreshToken === refreshTokenFromDB) {
            const { id, userName, email } = payload;
            const newAccessToken = jwt.sign({ id, userName, email }, process.env.JWT_SECRET, { expiresIn: '10m' });
            return res.status(200).json({ status: true, message: "Token refreshed successfully", newAccessToken });
        }
        return res.status(401).json({ status: false, message: "Invalid refresh token"});
    };
}