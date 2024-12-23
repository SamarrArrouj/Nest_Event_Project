import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  notifyParticipants(eventId: number, message: string): void {
    this.eventEmitter.emit('event.participant.notify', { eventId, message });
  }

  notifyGlobal(message: string): void {
    this.eventEmitter.emit('event.global.notify', { message });
  }
}
