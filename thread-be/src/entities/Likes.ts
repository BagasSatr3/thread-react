import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Threads";
import { User } from "./Users";

@Entity({ name: 'likes' })
export class Like {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Thread, (threads) => threads.likes, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    threads: Thread

    @ManyToOne(() => User, (user) => user.likes, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    user: User
}