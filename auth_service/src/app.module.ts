import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './auth/user.entity';
import { TokenService } from './token.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/micro_auth',
      entities: [
        UserEntity
      ],
      synchronize: true,
    }),
    AuthModule
  ],
})
export class AppModule { }
