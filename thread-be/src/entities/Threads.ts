import { Replies } from './Repiles';
import { Like } from './Likes';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./Users"

@Entity({name: "threads"})
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({nullable: true})
    image: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    posted_at: Date

    @ManyToOne(() => User, (user) => user.threads, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE",
        // cascade: true
    })
    user: User
    
    @OneToMany(() => Like, (like) => like.threads, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    likes: Like[]

    @OneToMany(() => Replies, (reply) => reply.threads, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    replies: Replies[]
}
