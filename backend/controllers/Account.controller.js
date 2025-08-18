import AccountService from "../services/Account.service.js";
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
dotenv.config();
class AccountController {

    constructor(AccountService) {
        this.AccountService = AccountService;
    }
    login = async (req, res, nex) => {
        console.log("Login request received", req.body);
        const { userName, passWord } = req.body;
        if (!userName || !passWord) {
            return { status: false, message: "Username and password are required" };
        }
        return await AccountService.login(userName, passWord)
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