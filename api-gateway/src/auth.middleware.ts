import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { TokenService } from "src/token.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware{

    constructor(private tokenService: TokenService){}

    async use(req: any, res: Response, next: NextFunction) {

        const token = req.headers.token || req.body.token;
        if(!token){
            const errors = ['Forbidden'];
            throw new HttpException({errors}, HttpStatus.FORBIDDEN);
        }

        try {
            // const decoded = await this.userService.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
            const decoded = await this.tokenService.verifyToken(token, 'abc');
            req.decoded = decoded;
        } catch (error) {
            throw new HttpException({error:[error.name]}, HttpStatus.UNAUTHORIZED);
        }
        
        next();
    }
}