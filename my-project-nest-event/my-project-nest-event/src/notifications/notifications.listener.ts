import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from 'src/notifications/email.service';
import { SmsService } from 'src/notifications/sms.service';

@Injectable()
export class NotificationsListener {
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
  ) {}

  @OnEvent('event.participant.notify')
  async handleParticipantNotification(payload: { eventId: number; message: string }) {
    console.log(`Notification envoyée aux participants de l'événement ${payload.eventId}: ${payload.message}`);
    
    // Envoi d'email
    await this.emailService.sendEmail(
      'participant@example.com', // Remplacez par les emails des participants
      `Mise à jour de l'événement ${payload.eventId}`,
      payload.message,
    );

    // Envoi de SMS
    await this.smsService.sendSms(
      '+1234567890', // Remplacez par les numéros des participants
      `Événement ${payload.eventId}: ${payload.message}`,
    );
  }

  @OnEvent('event.global.notify')
  async handleGlobalNotification(payload: { message: string }) {
    console.log(`Notification globale : ${payload.message}`);
    
    // Envoi d'email global
    await this.emailService.sendEmail(
      'global@example.com', // Email global
      'Notification globale',
      payload.message,
    );

    // Envoi de SMS global
    await this.smsService.sendSms(
      '+1234567890', // Numéro global
      `Notification globale: ${payload.message}`,
    );
  }
}
