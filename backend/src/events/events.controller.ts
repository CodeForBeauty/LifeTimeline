import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from '../db/event.entity';
import { CreateEventDto } from './createEvent.dto';
import { LoginService } from 'src/login/login.service';

@Controller('api/events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly loginService: LoginService,
  ) {}

  @Get(':id')
  async findAll(
    @Query('id') id: number,
    @Headers('Authorization') authorization: string,
  ): Promise<Event[]> {
    const [type, token] = authorization.split(' ');
    if (type === 'Bearer' && (await this.loginService.checkToken(token))) {
      return this.eventsService.findAll(id);
    }
    throw new UnauthorizedException();
  }

  @Post()
  async create(
    @Body() eventDto: CreateEventDto,
    @Headers('Authorization') authorization: string,
  ) {
    const [type, token] = authorization.split(' ');
    if (type === 'Bearer' && (await this.loginService.checkToken(token))) {
      return this.eventsService.create(eventDto);
    }
    throw new UnauthorizedException();
  }

  @Post('remove')
  async remove(
    @Body() event: Event,
    @Headers('Authorization') authorization: string,
  ) {
    const [type, token] = authorization.split(' ');
    if (type === 'Bearer' && (await this.loginService.checkToken(token))) {
      return this.eventsService.remove(event);
    }
    throw new UnauthorizedException();
  }
}
