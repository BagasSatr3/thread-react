import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Threads";
import { Like } from "./Likes";
import { Follow } from "./Follows";
import { Replies } from "./Repiles";

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string
    
    @Column()
    email: string

    @Column()
    full_name: string

    @Column({ select: true })
    password: string
    
    @Column({ nullable: true })
    profile_picture: string

    @Column({ nullable: true })
    profile_description: string

    // @Column({ nullable: true })
    // refresh_token: string

    @OneToMany(() => Thread, (threads) => threads.user, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE",
        // cascade: true
    })
    threads: Thread[]

    @OneToMany(() => Like, (likes) => likes.user, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    likes: Like[]

    @OneToMany(() => Follow, (follows) => follows.follower, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    followers: Follow[]

    @OneToMany(() => Follow, (follows) => follows.followed, {
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })
    folowings: Follow[]

    @OneToMany(() => Replies, (replies) => replies.user)
    replies: Replies[]
}