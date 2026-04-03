import nodemailer from 'nodemailer'
import { emailTemaplate } from './emailTemplate.js';

//const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export const sendEmail = async (email) => {
  const info = await transporter.sendMail({
    from: `"ShopEase Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "plz verify ur email",
    html: emailTemaplate(email),

  });

  console.log("Message sent:", info.messageId);
}