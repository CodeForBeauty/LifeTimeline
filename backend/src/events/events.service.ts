import { Injectable } from '@nestjs/common';
import { Event } from './event.interface';

import { Client } from 'pg';

@Injectable()
export class EventsService {
  private readonly events: Event[] = [];
  private readonly pgClient: Client = new Client();

  constructor() {
    void this.pgClient.connect();
  }

  findAll(user: number): Event[] {
    return this.events.filter((event) => event.user === user);
  }

  create(event: Event) {
    this.events.push(event);
  }
}
