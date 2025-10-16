import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from 'src/db/event.entity';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), LoginModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
