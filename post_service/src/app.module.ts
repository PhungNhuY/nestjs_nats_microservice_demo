import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mongodb',
      url: 'mongodb://localhost:27017/micro_post',
      entities: [
        PostEntity,
      ],
      synchronize: true,
    }),
    PostModule
  ],
})
export class AppModule {}
