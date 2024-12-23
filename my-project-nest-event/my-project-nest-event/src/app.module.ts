import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { EventEntity } from './typeorm/entities/EventEntity';
import { EventParticipant } from './typeorm/entities/EventParticipant';
import { NotificationsModule } from './notifications/notifications.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs_event',
      entities: [User,EventEntity,EventParticipant],
      synchronize: true,
    }),
    UsersModule,
    EventsModule,
    NotificationsModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
