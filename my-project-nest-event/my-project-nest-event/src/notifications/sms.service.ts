import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class SmsService {
  private client;

  constructor() {
    this.client = twilio('YOUR_ACCOUNT_SID', 'YOUR_AUTH_TOKEN'); // lezem compte
  }

  async sendSms(to: string, message: string) {
    await this.client.messages.create({
      body: message,
      from: '+1234567890', // Numéro compte
      to, // Numéro du destinataire
    });
    console.log(`SMS envoyé à ${to}`);
  }
}
