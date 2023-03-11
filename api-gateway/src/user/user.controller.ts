import { Body, Controller, Get, HttpCode, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get('hello')
    hello(){
        return this.userService.hello();
    }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() userData: CreateUserDto){
        return await this.userService.create(userData);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    @HttpCode(200)
    async login(@Body() loginData: LoginUserDto){
        return this.userService.login(loginData);
    }

    @Get()
    async getMe(@Req() req){
        return this.userService.findByEmail(req.decoded.email)
    }
}
