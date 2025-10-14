import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from '../db/event.entity';
import { CreateEventDto } from './createEvent.dto';

@Controller('api/events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  findAll(@Query('id') id: number): Promise<Event[]> {
    return this.eventsService.findAll(id);
  }

  @Post()
  create(@Body() eventDto: CreateEventDto) {
    return this.eventsService.create(eventDto);
  }

  @Post('remove')
  remove(@Body() event: Event) {
    return this.eventsService.remove(event);
  }
}
