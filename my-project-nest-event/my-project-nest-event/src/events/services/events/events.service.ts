import { Get, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity, EventCategory } from 'src/typeorm/entities/EventEntity';
import { EventParticipant, ParticipationStatus } from 'src/typeorm/entities/EventParticipant';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(EventParticipant)
    private eventParticipantRepository: Repository<EventParticipant>,
  ) {}

  async findEvents(): Promise<EventEntity[]> {
    return this.eventRepository.find();
  }


  async createEvent(title: string, description: string, date: Date, location: string, category: EventCategory): Promise<EventEntity> {
    const newEvent = this.eventRepository.create({
      title,
      description,
      date,
      location,
      category,
    });

    await this.eventRepository.save(newEvent);
    return newEvent;
  }


  async updateEvent(id: number, title: string, description: string, date: Date, location: string, category: EventCategory): Promise<EventEntity> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error('Event not found');
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    event.category = category;

    await this.eventRepository.save(event);
    return event;
  }


  async deleteEvent(id: number): Promise<void> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error('Event not found');
    }
    await this.eventRepository.remove(event);
  }


  async findOneEvent(id: number): Promise<EventEntity> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }
    return event;
  }


  async registerUserToEvent(userId: number, eventId: number): Promise<EventParticipant> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    if (!user || !event) {
      throw new Error('User or Event not found');
    }
    const eventParticipant = this.eventParticipantRepository.create({
      user,
      event,
      status: ParticipationStatus.INSCRIT,
    });
    return await this.eventParticipantRepository.save(eventParticipant);
  }



  async unregisterUserFromEvent(userId: number, eventId: number): Promise<string> {
   
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const event = await this.eventRepository.findOne({ where: { id: eventId } });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    if (!event) {
      throw new Error('Event not found');
    }
    const isRegistered = await this.eventParticipantRepository.findOne({
      where: { user: { id: userId }, event: { id: eventId } }
    });
  
    if (!isRegistered) {
      throw new Error('User is not registered for this event');
    }
    await this.eventParticipantRepository.delete({
      user: { id: userId },
      event: { id: eventId }
    });
    return `User ${userId} unregistered from event ${eventId}`;
  }

  async getListParticipant(eventId: number){
    const event= await this.eventRepository.findOne({
        where: { id: eventId },
        relations: ['participants', 'participants.user'],
    });
    if(!event){
        throw new Error(`Event with ID ${eventId} not found`);

    }
    return event.participants.map((participant) => participant.user); 
  }
  
  async filterEvents(filters: {
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
    category?: EventCategory;
  }): Promise<EventEntity[]> {
    const queryBuilder = this.eventRepository.createQueryBuilder('event');
  
    if (filters.title) {
      queryBuilder.andWhere('event.title LIKE :title', { title: `%${filters.title}%` });
    }
  
    if (filters.description) {
      queryBuilder.andWhere('event.description LIKE :description', { description: `%${filters.description}%` });
    }
  
    if (filters.date) {
      queryBuilder.andWhere('event.date = :date', { date: filters.date });
    }
  
    if (filters.location) {
      queryBuilder.andWhere('event.location LIKE :location', { location: `%${filters.location}%` });
    }
  
    if (filters.category) {
      queryBuilder.andWhere('event.category = :category', { category: filters.category });
    }
  
    return queryBuilder.getMany();
  }
  
  
  }
  

  
  

