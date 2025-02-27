import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') })

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
})

export async function welcomeEmail(username, email) {
    try {
        const mailOptions = {
            from: `CitizenConnect <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Successfully Registered on CitizenConnect',
            html: `
                <h1>Hello ${username}, Welcome to GraoInaBonga</h1>
                <p>With Citizen Connect, we bring to you:<br>
                Access to government documents which you can read and get insights from it through interaction with our AI ChatBot.<br>
                Ability to report incidents around you as they occur.<br>
                A platform to air out your views on discussions that matter.<br>
                Polls to voice your opinion on key topics. <br>
                At CitizenConnect every voice counts let yours be heard today.<br>
                #Kenya listens when you speak</p> <br>
                Best regards, <br> The Citizen Connect Team </p>
            `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Error sending email", error });
            }
            res.json({ message: "Welcome email sent", info });
        })
    } catch (error) {
        console.error(error)
    }
}

export async function passwordResetEmail(email) {
    try {
        const mailOptions = {
            from: `CitizenConnect <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <h1>Hello,</h1>
                <p>To reset your password, click on this link.<br>
                Best regards, <br> The Citizen Connect Team </p>
            `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Error sending email", error });
            }
            res.json({ message: "New poll email sent", info });
        })
    } catch (error) {
        console.error(error)
    }
}

export async function pollEmail(email) {
    try {
        const mailOptions = {
            from: `CitizenConnect <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Poll Created Successfully',
            html: `
                <h1>Hello,</h1>
                <p>Your poll has been created successfully on Citizen Connect. 🎯<br>
                Now, it’s time to gather opinions! Stay engaged and track responses in real time. Happy polling! <br>
                Best regards, <br> The Citizen Connect Team </p>
            `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Error sending email", error });
            }
            res.json({ message: "New poll email sent", info });
        })
    } catch (error) {
        console.error(error)
    }
}

export async function topicEmail(email) {
    try {
        const mailOptions = {
            from: `CitizenConnect <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Opinion question Created Successfully',
            html: `
                <h1>Hello,</h1>
                <p>Your question has been created successfully on Citizen Connect. 🎯<br>
                Now, it’s time to gather opinions! Stay engaged and track response summary on the dashboard.<br>
                Best regards, <br> The Citizen Connect Team </p>
            `
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Error sending email", error });
            }
            res.json({ message: "New poll email sent", info });
        })
    } catch (error) {
        console.error(error)
    }
}