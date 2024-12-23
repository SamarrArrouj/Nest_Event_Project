import { IsEnum, IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventParticipant } from './EventParticipant';

export enum EventCategory {
  CONFERENCE = 'Conférence',
  MEETING = 'Réunion',
  SPORT = 'Événement sportif',
  WORKSHOP = 'Atelier',
  SEMINAR = 'Séminaire',
}

@Entity({ name: 'events' })
export class EventEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column('text')
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({ type: 'timestamp' })
  @IsDateString()
  date: Date;

  @Column()
  @IsString()
  @IsNotEmpty()
  location: string;

  @Column({
    type: 'enum',
    enum: EventCategory,
  })
  @IsEnum(EventCategory)
  category: EventCategory;

  @OneToMany(() => EventParticipant, (eventParticipant) => eventParticipant.event)
  participants: EventParticipant[];
}
