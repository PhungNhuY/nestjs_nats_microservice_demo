import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IResponse } from 'src/response.interface';

@Injectable()
export class PostService {
    authCLient: any;
    constructor(@Inject('POST_SERVICE') private readonly postClient: ClientNats) {}
    
    async createPost(postData){
        const res = await lastValueFrom(this.postClient.send<IResponse>('create_post', postData).pipe());
        if(res.status === 'error'){
            throw new HttpException(
                {status: res.status, error: res.error},
                HttpStatus.BAD_REQUEST
            )
        }
        return {
            status: res.status,
            data: res.data
        }
    }

    async getAll(){
        const res = await lastValueFrom(this.postClient.send<IResponse>('post.getAll', '').pipe());
        if(res.status === 'error'){
            throw new HttpException(
                {status: res.status, error: res.error},
                HttpStatus.BAD_REQUEST
            )
        }
        return {
            status: res.status,
            data: res.data
        }
    }
}
