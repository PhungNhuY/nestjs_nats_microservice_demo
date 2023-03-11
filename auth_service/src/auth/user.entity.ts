import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export enum UserStatus {
    INACTIVATE = 'inactivate',
    ACTIVATE = 'activate'
}

@Entity('user')
export class UserEntity {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @MinLength(4)
    @MaxLength(64)
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.INACTIVATE
    })
    status: UserStatus = UserStatus.INACTIVATE;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole = UserRole.USER;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}