import nodemailer from "nodemailer";
import config from "../config/config";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: 587,
      secure: false,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  async sendEmail(to: string, subject: string, content: string) {
    const mailOptions = {
      from: config.EMAIL_FROM,
      to,
      subject,
      html: content,
    };

    console.log("mailOptions", mailOptions);
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("info", info);
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}
