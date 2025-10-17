import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from '../db/event.entity';
import { EventDto } from './event.dto';
import { LoginService } from 'src/login/login.service';

@Controller('api/events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly loginService: LoginService,
  ) {}

  @Get()
  async findAll(
    @Headers('Authorization') authorization: string,
  ): Promise<Event[]> {
    const [type, token] = authorization.split(' ');
    const user = await this.loginService.checkToken(token);
    if (type === 'Bearer' && user !== null) {
      return this.eventsService.findAll(user.id);
    }
    throw new UnauthorizedException();
  }

  @Post()
  async create(
    @Body() eventDto: EventDto,
    @Headers('Authorization') authorization: string,
  ) {
    const [type, token] = authorization.split(' ');
    const user = await this.loginService.checkToken(token);
    if (type === 'Bearer' && user !== null) {
      eventDto.user = user.id;
      return this.eventsService.create(eventDto);
    }
    throw new UnauthorizedException();
  }

  @Delete()
  async remove(
    @Body() eventDto: EventDto,
    @Headers('Authorization') authorization: string,
  ) {
    const [type, token] = authorization.split(' ');
    const user = await this.loginService.checkToken(token);
    if (type === 'Bearer' && user !== null) {
      eventDto.user = user.id;
      return this.eventsService.remove(eventDto);
    }
    throw new UnauthorizedException();
  }
}
