import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

export function SendEmail(to, text, data){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailToken = jwt.sign({
            data: data
        }, process.env.JWT_SECRET, { expiresIn: '10m' }
    );

    const mailConfigurations = {
        // It should be a string of sender/server email
        from: process.env.EMAIL_USERNAME,

        to: to, // receiver email

        // Subject of Email
        subject: 'Email Verification',
        
        // This would be the text of email body
        text: text,
    };

    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
    });
}