import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created.even';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService {

  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientNats,
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent){
    this.authClient
      .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
      .subscribe((user) => {
        console.log(`Billing user with id ${user.stripeUserId} a price of $${orderCreatedEvent.price}`);
      });
    
  }
}
