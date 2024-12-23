import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/typeorm/entities/EventEntity'; 
import { EventService } from './services/events/events.service';
import { EventController } from './controllers/events/events.controller';
import { UsersModule } from 'src/users/users.module';
import { EventParticipant } from 'src/typeorm/entities/EventParticipant';


@Module({
  imports: [TypeOrmModule.forFeature([EventEntity,EventParticipant]),UsersModule],
  controllers: [EventController],
  providers: [EventService],
  
})
export class EventsModule {}
