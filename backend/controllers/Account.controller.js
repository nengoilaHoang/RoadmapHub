import AccountService from "../services/Account.service.js";
import AccountDAO from "../daos/Account.dao.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import nodemailer from 'nodemailer';
import { SendEmail } from "../middlewares/SendEmailMiddleWare.js";
dotenv.config();
//const accountService = new AccountService(new AccountDAO());
class AccountController {
    login = async (req,res,next)=>{
        if(req.authenticate) {
            console.log("User is already logged in");
            return res.status(200).json({status: true, message: "User is already logged in"});
        }
        else{
            console.log("Login request received", req.body);
            const {email, passWord, type} = req.body;
            let account;
            if(type === 'normal'){
                    if(!email || !passWord) {
                    return res.status(400).json({status: false, message: "Email and password are required"});
                }
                account = await AccountService.login(email, passWord)
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
                const result = await AccountService.setRefreshToken(account.id, refreshToken);
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
        }
    };
    loginVerify = async (req, res, next) => {
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
    refreshToken = async (req, res, next) => {
        const { refreshToken } = req.body;
        //const payload = jwt.decode(refreshToken);
        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
        //const idString = payload.id;
        const bufData = payload.id.data;
        const idString = Buffer.from(bufData).toString('utf-8');
        const refreshTokenFromDB = await AccountService.getRefreshTokenById(idString);
        //Verify the refresh token and issue a new access token
        if (refreshToken === refreshTokenFromDB) {
            const { id, userName, email } = payload;
            const newAccessToken = jwt.sign({ id, userName, email }, process.env.JWT_SECRET, { expiresIn: '10m' });
            return res.status(200).json({ status: true, message: "Token refreshed successfully", newAccessToken });
        }
        return res.status(401).json({ status: false, message: "Invalid refresh token"});
    };

    checkLogin = async (req, res, next) => {
        console.log(req.headers.authorization);
        console.log("Check login request received", req.authenticate);
        if (req.authenticate) {
            console.log("User is logged in", req.authenticate);
            return res.status(200).json({ status: true, message: "User is logged in", user: req.authenticate });
        }
        else {
            return res.status(401).json({ status: false, message: "User is not logged in" });
        }
    }
    verifyEmail = async (req, res, nex) => {

        console.log("ggg", req.body)
        const {email,password,fullname} = req.body;
        const resultCheckAccount = await AccountService.checkExitAccount(email);
        if(resultCheckAccount.success){
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const token = jwt.sign(
            {
                email,
                fullname,
                password
            },
            process.env.JWT_SECRET || 'ourSecretKey', 
            { expiresIn: '10m' }
        );
        const mailConfigurations = {

            // It should be a string of sender/server email
            from: process.env.EMAIL_USERNAME,

            to: email,

            // Subject of Email
            subject: 'Email Verification',

            // This would be the text of email body
            html: `
                    <h1>Email Verification</h1>
                    <p>Hi! You have recently registered on our website.</p>
                    <p>Please click the link below to verify your email:</p>
                    <a href="http://localhost:5000/api/accounts/verify/${token}">Verify Email</a>
                    <p>This link will expire in 10 minutes.</p>
                `
        };

        transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) 
            {
                    // throw Error(error);
                    return res.json({success:false,message:'Failed to send email'})
            }
            console.log('Email Sent Successfully');
            console.log(info);
            return res.json({
                    success:true,message:'Email Sent Successfully'
                })
        });
        }
        else {
            return res.json(resultCheckAccount)
        }
    }
    verify = async (req,res,next)=>{    
        const {token} = req.params;
        // Verifying the JWT token 
        jwt.verify(token, process.env.JWT_SECRET||'ourSecretKey', async function(err, decoded) {
        if (err) {
            console.log(err);
            res.send("Email verification failed, possibly the link is invalid or expired");
            // return {
            //     success:false,
            //     status: 1, //Email verification failed, possibly the link is invalid or expired
            //     message:'Email verification failed, possibly the link is invalid or expired'
            // }
        }
        else {
            const { email, password, fullname } = decoded;
            await AccountService.createAccount(email,fullname,password);
            res.redirect('http://localhost:3000/login')
            // res.send("Email verifified successfully");
            // console.log(response)
            
        }
    });
    }
    signUpGoogle = async (req,res)=>{
        const {email,password,fullname} = req.body;
        console.log(req.body);
        const resultCheckAccount = await AccountService.checkExitAccount(email);
        if(resultCheckAccount.success){
            await AccountService.createAccount(email,fullname,password);
            res.json ({
                success:true,
                message:'Sign up with google successfully'
            })
            // res.redirect('http://localhost:3000/')
        }
        else {
            res.json( {
                success:false,
                message:'Sign up with google unsuccessfully'
            })
            // res.redirect('http://localhost:3000/login/')
        }
       

    }

}
export default new AccountController(AccountService)