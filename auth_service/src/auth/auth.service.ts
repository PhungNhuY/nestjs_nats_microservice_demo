import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { IResponse } from 'src/response.interface';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private dataSource: DataSource,
    private readonly tokenService: TokenService
  ) { }

  async createUser(createUserData: CreateUserDto): Promise<IResponse> {
    // check username/email
    const user = await this.dataSource.getMongoRepository(UserEntity).findOne({
      where: {
        $or: [
          { username: createUserData.username },
          { email: createUserData.email }
        ]
      }
    });

    if (user) {
      const error = new Array<any>();
      if (user.email == createUserData.email) error.push('Email has been duplicated');
      if (user.username == createUserData.username) error.push('Username has been duplicated');

      return {
        status: 'error',
        data: null,
        error,
        code: HttpStatus.BAD_REQUEST
      };
    }

    // create new user
    const newUser = new UserEntity();
    newUser.username = createUserData.username;
    newUser.email = createUserData.email;
    newUser.password = createUserData.password;

    const error = await validate(newUser);
    if (error.length > 0) {
      return {
        status: 'error',
        data: null,
        error: [],
        code: HttpStatus.BAD_REQUEST
      };
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return {
        status: 'success',
        data: { user: this.buildUserData(savedUser) },
        error: null,
        code: HttpStatus.CREATED
      };
    }
  }

  async login(loginData: LoginUserDto): Promise<IResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginData.email
      }
    });

    if (!user){ 
      return {
        status: 'error',
        data: null,
        error: ['Email or password is incorrect'],
        code: HttpStatus.UNAUTHORIZED
      };
    }

    const comparePassword = await bcrypt.compare(loginData.password, user.password);
    if (comparePassword) {

      // gen token
      const payload = {
          username: user.username,
          email: user.email
      };
      const token = await this.tokenService.generateToken(
          payload, 
          // process.env.ACCESS_TOKEN_SECRET, 
          // process.env.ACCESS_TOKEN_LIFE)
          'abc',
          '60m'
      );

      return {
        status: 'success',
        data: { user: this.buildUserData(user), token },
        error: null,
        code: HttpStatus.CREATED
      };
    }

    return {
      status: 'error',
      data: null,
      error: ['Email or password is incorrect'],
      code: HttpStatus.UNAUTHORIZED
    };
  }

  async findByEmail(email: string): Promise<IResponse>{
    const user = await this.userRepository.findOne({
        where:{email}
    });
    if(!user) return {
      status: 'error',
      data: null,
      error: ['user not found'],
      code: HttpStatus.BAD_REQUEST
    };

    return {
      status: 'success',
      data: { user: this.buildUserData(user) },
      error: null,
      code: HttpStatus.OK
    };
  }

  private buildUserData(user: UserEntity) {
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      status: user.status,
      role: user.role,
      createdDate: user.createdDate,
      updatedDate: user.updatedDate
    };

    return userData;
  }
}
