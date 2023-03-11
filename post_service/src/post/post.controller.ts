import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreatePostDto } from './dto/createPost.dto';

@Controller()
export class PostController {
    constructor(private readonly postService: PostService){}

    @MessagePattern('create_post')
    async createPost(postData: CreatePostDto){
        return this.postService.createPost(postData);
    }

    @MessagePattern('post.getAll')
    async getAll(){
        return this.postService.findAll();
    }
}
