import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = (
  toEmail: string,
  emailSubject: string,
  emailText?: string,
  emailHtml?: string
) => {
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });

  const mailOption = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: emailSubject,
    text: emailText,
    html: emailHtml,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
