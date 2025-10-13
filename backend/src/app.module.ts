import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { EventsModule } from './events/events.module';
import { ConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [LoginModule, EventsModule, ConfigModule, DbModule],
})
export class AppModule {}
