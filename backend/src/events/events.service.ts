import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../db/event.entity';
import { EventDto } from './event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(user: number): Promise<Event[]> {
    return this.eventRepository.findBy({ user });
  }

  async create(event: EventDto): Promise<Event> {
    const toSave = this.eventRepository.create(event);

    return this.eventRepository.save(toSave);
  }

  async remove(event: EventDto) {
    const found = await this.eventRepository.findOneBy(event);
    if (found === null) {
      return null;
    }
    return this.eventRepository.remove(found);
  }
}
