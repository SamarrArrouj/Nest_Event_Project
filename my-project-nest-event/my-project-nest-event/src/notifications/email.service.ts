import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com', // Votre email
        pass: 'your-email-password',    // Votre mot de passe
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: '"Event Notifications" <your-email@example.com>',
      to,
      subject,
      text,
      html,
    };

    await this.transporter.sendMail(mailOptions);
    console.log(`Email envoyé à ${to}`);
  }
}
