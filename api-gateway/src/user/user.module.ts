import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TokenService } from 'src/token.service';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
          queue: 'auth-queue'
        }
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, TokenService],
  exports: [TokenService]
})
export class UserModule {}
