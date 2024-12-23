import { Module } from '@nestjs/common';
import { EmailService } from 'src/notifications/email.service';
import { SmsService } from 'src/notifications/sms.service';
import { NotificationsListener } from 'src/notifications/notifications.listener';

@Module({
  providers: [EmailService, SmsService, NotificationsListener],
  exports: [EmailService, SmsService],
})
export class NotificationsModule {}
