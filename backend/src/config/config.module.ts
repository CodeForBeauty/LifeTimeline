import { Module } from '@nestjs/common';
import config from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    config.ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
