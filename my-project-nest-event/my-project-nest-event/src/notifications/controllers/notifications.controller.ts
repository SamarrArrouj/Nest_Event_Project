import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotifyParticipantDto, NotifyGlobalDto } from 'src/notifications/dto/notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('participant')
  notifyParticipant(@Body() body: NotifyParticipantDto) {
    this.notificationsService.notifyParticipants(body.eventId, body.message);
    return { message: 'Notification envoyée aux participants.' };
  }

  @Post('global')
  notifyGlobal(@Body() body: NotifyGlobalDto) {
    this.notificationsService.notifyGlobal(body.message);
    return { message: 'Notification globale envoyée.' };
  }
}
