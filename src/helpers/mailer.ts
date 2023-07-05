import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

const MAILER_HOST = process.env.MAILER_HOST ?? "";
const MAILER_PORT = process.env.MAILER_PORT ?? 0;
const MAILER_USER = process.env.MAILER_USER ?? "";
const MAILER_PASSWORD = process.env.MAILER_PASSWORD ?? "";


export const sendEmail = async ({ email, emailType, userId }: any) => {
  // create a hash token
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY_EMAIL") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyExpiry: Date.now() + 3600000, // 1hr
      });
    } else if (emailType === "RESET_PASSWORD") {
      await User.findByIdAndUpdate(userId, {
        forgotPassword: hashToken,
        forgotPasswordExpiry: Date.now() + 1000 * 60 * 60, // 1hr
      });
    }

    var transport = nodemailer.createTransport({
      host: MAILER_HOST,
      port: Number(MAILER_PORT),
      auth: {
        user: MAILER_USER,
        pass: MAILER_PASSWORD
      }
    });

    const path = emailType === "VERIFY_EMAIL" ? "verifyEmail" : "resetPassword";
    const url = `${process.env.DOMAIN}/${path}?token=${hashToken}`;
    const subject = emailType === "VERIFY_EMAIL" ? "Verify your email" : "Reset your password";

    const mailOptions = {
      from: "joy@mydomain.com",
      to: email,
      subject: subject,
      html: `<p>Click <a href="${url}">here</a> to ${subject.toLocaleLowerCase()}</p> or copy and paste this link in your browser: ${url}`,
    };

    const mailResponse = transport.sendMail(mailOptions);
    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
