import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserDto } from './user.dto';

@Controller('api/user')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @HttpCode(201)
  @Post('register')
  register(@Body() userdto: UserDto) {
    return this.loginService.create(userdto);
  }

  @HttpCode(200)
  @Post('login')
  login(@Body() userdto: UserDto) {
    return this.loginService.login(userdto);
  }
}
