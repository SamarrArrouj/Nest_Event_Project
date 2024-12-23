import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { FilterEventsDto } from 'src/events/dtos/FilterEvent.dto';
import { EventService } from 'src/events/services/events/events.service';
import { EventCategory, EventEntity } from 'src/typeorm/entities/EventEntity';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvents(): Promise<EventEntity[]> {
    return this.eventService.findEvents();
  }

  @Post('/create')
  async createEvent(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('date') date: Date,
    @Body('location') location: string,
    @Body('category') category: EventCategory,
  ): Promise<EventEntity> {
    return this.eventService.createEvent(title, description, date, location, category);
  }

  @Put('/update/:id')
  async updateEvent(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('date') date: Date,
    @Body('location') location: string,
    @Body('category') category: EventCategory,
  ): Promise<EventEntity> {
    return this.eventService.updateEvent(id, title, description, date, location, category);
  }

  @Delete('/delete/:id')
  async deleteEvent(@Param('id') id: number): Promise<void> {
    await this.eventService.deleteEvent(id);
  }

  @Get(':id')
  async getEvent(@Param('id') id: number): Promise<EventEntity> {
    return this.eventService.findOneEvent(id);
  }

  @Post(':eventId/register/:userId')
  async registerUser(@Param('userId') userId: number, @Param('eventId') eventId: number) {
    return this.eventService.registerUserToEvent(userId, eventId);
  }

  @Delete(':eventId/unregister/:userId')
async unregisterUser(@Param('userId') userId: number, @Param('eventId') eventId: number) {
  try {
    const message = await this.eventService.unregisterUserFromEvent(userId, eventId);
    return { message };
  } catch (error) {
    return { error: error.message }; 
}

}

@Get(':eventId/participants')
async getParticipants(@Param('eventId') eventId: number){
    return await this.eventService.getListParticipant(eventId);
}


@Get('filter')
  async filterEvents(@Query() filters: FilterEventsDto): Promise<EventEntity[]> {
    return this.eventService.filterEvents(filters);
  }


}

