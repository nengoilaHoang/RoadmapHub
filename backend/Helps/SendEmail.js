import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import promises from 'bluebird';
dotenv.config();

export function SendEmail(mailData){
    const { to, text, html } = mailData;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailConfigurations = {
        // It should be a string of sender/server email
        from: process.env.EMAIL_USERNAME,

        to: to, // receiver email

        // Subject of Email
        subject: 'Email Verification',
        
        // This would be the text of email body
        text: text,

        html: html,
    };
    return new promises((resolve, reject) => {
        transporter.sendMail(mailConfigurations, function(error, info){
            if (error) {
                console.error(error);
                return resolve(false); // hoặc reject(error) nếu muốn bắt lỗi riêng
            }
            console.log('Email Sent Successfully');
            console.log(info);
            return resolve(true);
        });
    });
}