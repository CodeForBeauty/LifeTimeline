import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.interface';
import { CreateEventDto } from './createEvent.dto';

@Controller('api/events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  findAll(@Query('id') id: number): Event[] {
    return this.eventsService.findAll(id);
  }

  @Post()
  create(@Body() eventDto: CreateEventDto) {
    this.eventsService.create(eventDto);
  }
}
