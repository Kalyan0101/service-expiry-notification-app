import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: String(process.env.ADMIN_EMAIL),
    pass: String(process.env.ADMIN_PASSWORD),
  },
});

const sendRenewEmail = async (customer_mail, serviceName, expiryDate, daysLeft) => {
  const mailOptions = {
    from: `"service Notification`,
    to: customer_mail,
    subject: `service expiry reminder for ${serviceName}`,
    text: `Dear Customer,
        Your service "${serviceName}" is expiring on ${expiryDate}. You have ${daysLeft} days left to renew your service.
        please renew your service to avoid interruption.
        Thank You.`,
  };
  await transporter.sendMail(mailOptions);
};

const sendOtpEmail = async (mail, otp) => {
  const mailOptions = {
    from: `"service Notification`,
    to: mail,
    subject: `Reset Password`,
    text: `Dear Customer,
        Your One Time Password(OTP): ${otp}
        Otp valid for 10 min.
        Thank You.`,
  };
  return await transporter.sendMail(mailOptions);
};

export { sendRenewEmail, sendOtpEmail };
