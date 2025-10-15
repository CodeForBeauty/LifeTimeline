import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserDto } from './user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  register(@Body() userdto: UserDto) {
    return this.loginService.create(userdto);
  }

  @Post('login')
  login(@Body() userdto: UserDto) {
    return this.loginService.login(userdto);
  }
}
