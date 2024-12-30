import { createTransport } from "nodemailer";
import { resetPasswordEmailTemplate } from "./emailTemplates.js";

export const sendForgotPasswordMail = (options) => {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: "Reset Password",
      html: resetPasswordEmailTemplate(options.fullname, options.resetUrl),
      category: "Reset Password",
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };