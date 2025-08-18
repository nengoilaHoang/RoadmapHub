import AccountService from "../services/Account.service.js";
import AccountDAO from "../daos/Account.dao.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import nodemailer from 'nodemailer';
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
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            let encodeToken = CryptoJS.AES.encrypt(token, process.env.CRYPTO_SECRET).toString();
            //tạo và hashed mã pin
            const pin = Math.floor(100000 + Math.random() * 900000).toString();
            let hashedPin = await bcrypt.hash(pin, parseInt(process.env.BCRYPT_SALT_ROUNDS));
            // gửi pin qua mail
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            const mailToken = jwt.sign({
                    data: 'Token Data'
                }, process.env.JWT_SECRET, { expiresIn: '10m' }
            );

            const mailConfigurations = {
                // It should be a string of sender/server email
                from: process.env.EMAIL_USERNAME,

                to: account.email, // receiver email

                // Subject of Email
                subject: 'Email Verification',
                
                // This would be the text of email body
                text: `Hi! There, this is your pin code: ${pin}. Please use this pin to verify your login. The pin is valid for 10 minutes. If you did not request this, please ignore this email.`,
            };

            transporter.sendMail(mailConfigurations, function(error, info){
                if (error) throw Error(error);
                console.log('Email Sent Successfully');
                console.log(info);
            });
            return res.status(200).json({status: true, message: "Login successful", account, token, pin, hashedPin, encodeToken});
        }
    };
    static loginVerify = async (req, res, next) => {
        const { hashedPin, encodeToken, pin } = req.body;
        // Verify the hashedPin
        let validPin = await bcrypt.compare(pin, hashedPin);
        // If valid, log the user in
        if (validPin) {
            // Create a new session or token for the user
            const decodedToken = CryptoJS.AES.decrypt(encodeToken, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
            return res.status(200).json({ status: true, message: "Login successful", decodedToken });
        }
        // If invalid, return an error response
    };
}