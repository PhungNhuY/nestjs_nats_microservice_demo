import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IResponse } from 'src/response.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('user.create')
  async createUser(userData: CreateUserDto): Promise<IResponse>{
    return this.authService.createUser(userData);
  }

  @MessagePattern('login')
  async login(loginData: LoginUserDto): Promise<IResponse>{
    return this.authService.login(loginData);
  }

  @MessagePattern('findByEmail')
  async getMe(email: string): Promise<IResponse> {
    return this.authService.findByEmail(email);
  }
}
