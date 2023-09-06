import { Repository } from "typeorm";
import { Like } from "../entities/Likes";
import { AppDataSource } from "../data-source";

class LikesService {
    private readonly likeRepository: Repository<Like> = AppDataSource.getRepository(Like)

    async create(reqBody: any, loginSession: any): Promise<any> {
        try {
            const isLikeExist = await this.likeRepository.count({
                where: {
                    user: {
                        id: loginSession.userId
                    },
                    threads: {
                        id: reqBody.threadsId
                    }
                }
            })

            if (isLikeExist > 0) {
                throw new Error("Already liked thread!")
            }

            const like = this.likeRepository.create({
                threads: {
                    id: reqBody.threadsId
                },
                user: {
                    id: loginSession.userId
                }
            })

            await this.likeRepository.save(like)

            return {
                message: "liked thread!",
                like: like
            }
        } catch (error) {
            throw new Error("dolor!")
        }
    }

    async delete(threadsId: number, loginSession: any): Promise<any> {
        try {
            const like = await this.likeRepository.findOne({
                where: {
                    threads: {
                        id: threadsId
                    },
                    user: {
                        id: loginSession.userId
                    }
                }
            })

            if (!like) throw new Error("didn't liked thread")

            await this.likeRepository.delete({
                id: like.id
            })

            return {
                message: "Unliked thread!",
                like: like
            }
        } catch (error) {
            throw new Error("ipsum!")
        }
    }
}

export default new LikesService()