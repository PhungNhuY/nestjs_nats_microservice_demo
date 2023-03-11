import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>
    ){}

    async createPost(postData: CreatePostDto){

        const newPost = new PostEntity();
        newPost.author = postData.author;
        newPost.title = postData.title;
        newPost.content = postData.content;

        const error = await validate(newPost);
        if (error.length > 0) {
            return {
                status: 'error',
                data: null,
                error: [],
                code: HttpStatus.BAD_REQUEST
            };
        }else{
            const post = await this.postRepository.save(postData);
            return {
                status: 'success',
                data: {post},
                error: null,
                code: HttpStatus.CREATED
            }
        }        
    }

    async findAll(){
        const posts = await this.postRepository.find();
        return {
            status: 'success',
            data: {
                posts,
            },
            error: null,
            code: HttpStatus.OK
        }
    }
}
