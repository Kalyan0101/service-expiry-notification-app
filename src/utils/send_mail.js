import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.CRON_EMAIL,
    pass: process.env.CRON_PASSWORD,
  },
});

const sendEmail = async (toString, serviceName, expiryDate, daysLeft) => {
  const mailOptions = {
    from: `"service Notification <${process.env.ADMIN_EMAIL}>`,
    to: toString,
    subject: `service expiry reminder for ${serviceName}`,
    text: `Dear Customer,
        Your service "${serviceName}" is expiring on ${expiryDate}. You have ${daysLeft} days left to renew your service.
        please renew your service to avoid interruption.
        Thank You.`,
  };
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
