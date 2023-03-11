import { Body, Controller, Get, HttpCode, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

    @UsePipes(new ValidationPipe())
    @Post()
    async createPost(@Req() req, @Body() postData: CreatePostDto){
        const data = {
            author: req.decoded.email,
            title: req.body.title,
            content: req.body.content
        }
        return await this.postService.createPost(data);
    }

    @Get()
    @HttpCode(200)
    async getAll(){
        return await this.postService.getAll();
    }
}
