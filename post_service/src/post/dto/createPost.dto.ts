import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto{

    @IsEmail()
    @IsNotEmpty()
    readonly author: string;

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly content: string;
}
