import { Thread } from './../entities/Threads';
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Replies } from '../entities/Repiles';

class RepliesService {
    private readonly replyRepository: Repository<Replies> =
    AppDataSource.getRepository(Replies)

    async find(reqQuery: any): Promise<any> {
        const threadId = parseInt(reqQuery.threadsId ?? 0)
        try {
            const replies = await this.replyRepository.find(
                { relations: [
                    'user',
                    // 'threads',
                    ],
                    order: {id: "DESC"},
                    where: {
                        threads: {
                            id: threadId
                        }
                    }
                }
            )

            // replies.forEach((element) => {
            //     id: element.id
            //     content: element.content
            // })
            

            // let ressa = []

            // threads.forEach((element) => {
            //     ressa.push({
            //         ...element,
            //         likes_count: element.likes.length,
            //         replies_count: element.replies.length,
            //     })
            // });

            return replies
        } catch (err) {
            throw new Error('error server')
            // return res.status(500).json({ err: "error while getting replies" })
        }
    }

    async create(req: Request, res: Response) {
        // try {
            const loginSession = res.locals.loginSession

            const replies = this.replyRepository.create({
                threads: {
                    id : req.body.threadsId
                },
                user: {
                    id: loginSession.userId
                },
                content: req.body.content
            })

            const result = await this.replyRepository.save(replies)
            return res.status(200).json(result)
        // } catch (error) {
            
        // }
    }

}

export default new RepliesService()