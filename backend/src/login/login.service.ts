import { Injectable } from '@nestjs/common';
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
      return jwt.sign(user, secret);
    }
    return '';
  }

  // Returns token or null if incorrect
  async login(user: UserDto): Promise<string | null> {
    const secret = this.config.get<string>('app.secretKey');

    const found = await this.userRepository.findOneBy(user);
    if (found === null) {
      return null;
    }

    if (secret !== undefined) {
      return jwt.sign(user, secret);
    }
    return '';
  }

  async checkToken(token: string): Promise<boolean> {
    const secret = this.config.get<string>('app.secretKey');
    if (secret !== undefined) {
      const decoded = jwt.verify(token, secret) as UserDto;

      const found = await this.userRepository.findOneBy(decoded);

      if (found !== null) {
        return true;
      }
    }

    return false;
  }
}
