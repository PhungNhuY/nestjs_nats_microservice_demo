import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('post')
export class PostEntity{

    @ObjectIdColumn()
    id: ObjectID;

    @IsEmail()
    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}