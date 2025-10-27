import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/db/user.entity';
import { Event } from 'src/db/event.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Event])],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
