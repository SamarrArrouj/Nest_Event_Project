import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { EventParticipant } from "./EventParticipant";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    @IsString()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    @IsEnum(UserRole)
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => EventParticipant, (eventParticipant) => eventParticipant.user)
    participations: EventParticipant[];
}
