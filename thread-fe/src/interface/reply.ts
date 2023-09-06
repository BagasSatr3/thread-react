import { IThreadCard } from "./thread"
import { IUser } from "./user"

export interface IReply {
    id: number
    content: string
    user: IUser
}

export interface IReplyPost {
    content: string
    threadsId: number
}