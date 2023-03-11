import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth.middleware';
import { UserController } from './user/user.controller';
import { PostModule } from './post/post.module';
import { PostController } from './post/post.controller';

@Module({
  imports: [
    UserModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {path:'user/register', method: RequestMethod.ALL},
        {path:'user/login', method: RequestMethod.ALL},
        {path: 'post', method: RequestMethod.GET}
      )
      .forRoutes(UserController, PostController)
  }
}
