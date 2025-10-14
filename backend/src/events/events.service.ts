import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../db/event.entity';
import { CreateEventDto } from './createEvent.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(user: number): Promise<Event[]> {
    return this.eventRepository.findBy({ user });
  }

  async create(event: CreateEventDto): Promise<Event> {
    const toSave = this.eventRepository.create(event);

    return this.eventRepository.save(toSave);
  }

  async remove(event: Event) {
    return this.eventRepository.remove(event);
  }
}
