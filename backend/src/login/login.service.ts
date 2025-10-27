import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  async getHash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async checkPassword(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }

  // Returns token
  async create(user: UserDto): Promise<string> {
    user.password = await this.getHash(user.password);
    const created = this.userRepository.create(user);

    await this.userRepository.save(created);

    const secret = this.config.get<string>('app.secretKey');
    if (secret !== undefined) {
      return jwt.sign({ ...created }, secret);
    }
    throw new UnauthorizedException();
  }

  // Returns token or null if incorrect
  async login(user: UserDto): Promise<string | null> {
    const secret = this.config.get<string>('app.secretKey');

    const found = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (
      found === null ||
      !(await bcrypt.compare(user.password, found.password))
    ) {
      throw new UnauthorizedException();
    }

    if (secret !== undefined) {
      return jwt.sign({ ...found }, secret);
    }
    throw new UnauthorizedException();
  }

  async checkToken(token: string): Promise<User | null> {
    try {
      const secret = this.config.get<string>('app.secretKey');
      if (secret !== undefined) {
        const decoded = jwt.verify(token, secret) as UserDto;

        const found = await this.userRepository.findOneBy({
          username: decoded.username,
        });

        if (found !== null && found.password === decoded.password) {
          return found;
        }
      }

      return null;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async clear(): Promise<boolean> {
    if (this.config.get<string>('app.envType') == 'TEST') {
      await this.userRepository.clear();
      await this.eventRepository.clear();
      return true;
    } else {
      return false;
    }
  }
}
