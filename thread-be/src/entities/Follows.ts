import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Threads";
import { User } from "./Users";

@Entity({ name: 'follows' })
export class Follow {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.followers, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    follower: User

    @ManyToOne(() => User, (user) => user.folowings, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    followed: User
}