import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './application/login.service';
import { LoginRequest } from './application/dtos/login.request';
import { LoginResponse } from './application/dtos/login.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginRequest): Promise<LoginResponse> {
    return await this.loginService.execute(loginDto);
  }
}
