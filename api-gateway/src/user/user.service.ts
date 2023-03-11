import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import {lastValueFrom } from 'rxjs';
import { IResponse } from 'src/response.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {

    constructor(@Inject('AUTH_SERVICE') private readonly authCLient: ClientNats) {}

    hello(){
        return 'hello';
    }

    async create(userData: CreateUserDto){
        const res = await lastValueFrom(this.authCLient.send<IResponse>('user.create', userData).pipe());
        if(res.status === 'error'){
            throw new HttpException(
                {status: res.status, error: res.error},
                HttpStatus.BAD_REQUEST
            )
        }
        return {
            status: res.status,
            data: res.data
        }
    }

    async login(loginData: LoginUserDto){
        const res = await lastValueFrom(this.authCLient.send<IResponse>('login', loginData).pipe());
        if(res.status === 'error'){
            throw new HttpException(
                {status: res.status, error: res.error},
                HttpStatus.BAD_REQUEST
            )
        }
        return {
            status: res.status,
            data: res.data
        }
    }

    async findByEmail(email: string){
        const res = await lastValueFrom(this.authCLient.send<IResponse>('findByEmail', email).pipe());
        if(res.status === 'error'){
            throw new HttpException(
                {status: res.status, error: res.error},
                HttpStatus.BAD_REQUEST
            )
        }
        return {
            status: res.status,
            data: res.data
        }
    }
}
