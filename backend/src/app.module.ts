import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoginModule } from './login/login.module';
import { EventsModule } from './events/events.module';
import { AppConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';
import { join } from 'path';

@Module({
  imports: [
    LoginModule,
    EventsModule,
    AppConfigModule,
    DbModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/{*test}'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
  ],
})
export class AppModule {}
