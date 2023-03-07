import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { CreateOrderRequest } from './create-order-request.dto';
import { OrderCreatedEvent } from './order-created.even';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientNats,
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  createOrder({userId, price}: CreateOrderRequest){
    this.billingClient.emit('order_created', new OrderCreatedEvent('123', userId, price));
  }
}