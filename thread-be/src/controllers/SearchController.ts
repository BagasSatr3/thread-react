import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ILike, Like, Repository } from "typeorm";
import { User } from "../entities/Users";
import { Follow } from "../entities/Follows";
import { shuffle } from 'lodash'

class SearchController {
    private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User)

    async search(req: Request, res: Response) {
        // let follows: Follow[]

        try {
            const loginSession = res.locals.loginSession
            const searchQuery = req.query.q

            if (!searchQuery) {
                return res.status(400).json({
                    message: "Search query is required"
                })
            }

            const user = await AppDataSource.getRepository(User).createQueryBuilder('users').where('users.full_name ILIKE :query OR users.username ILIKE :query' , { query: `%${searchQuery}%` }).getMany()

            const follow = await AppDataSource.getRepository(Follow).find({
                where: { 
                    follower: loginSession.userId
                 },
                 order: {
                    id: "ASC"
                 },
                 relations: ["followed"]
            })
            
            const suffled = shuffle(user).slice(0, user.length)
            let response = []
            suffled.forEach((element) => {
                const isFollowed = follow.some((q) => q.followed.id === element.id)
                if(!isFollowed) {
                    response.push({
                        ...element,
                        is_followed: false
                    })
                }
            })

            

            // const user = await this.userRepository.createQueryBuilder('user').where(
            //     `user.username LIKE :searchItem OR user.full_name LIKE :searchItem`, { searchItem: `%${searchItem}` }
            //     full_name: Like(`%${searchItem}`)
            //     ).getMany()

            // const user = await AppDataSource.getRepository(User).find() 
            // res.json(user)
            // const results =  await Promise.all(
                
            //     follows.map(async (follow) => {
            //         const isFollowed = await AppDataSource.getRepository(Follow).count({
            //             where: {
            //                 follower: {
            //                     id: loginSession.userId
            //                 },
            //                 followed: {
            //                     id: follow.follower.id
            //                 }
            //             }
            //         })

            //         return {
            //             id: follow.id,
            //             user_id: follow.follower.id,
            //             username: follow.follower.username,
            //             full_name: follow.follower.full_name,
            //             email: follow.follower.email,
            //             picture: follow.follower.profile_picture,
            //             description: follow.follower.profile_description,
            //             is_followed: isFollowed > 0
            //         }
            //     })
            // )

            // const processedUsers = await Promise.all(
            //     users.map(async (user) => {
            //         const follow = follows.find((follow) => follow.followed.id === user.id);
            //         const isFollowed = follow ? true : false;

            //         return {
            //             id: user.id,
            //             user_id: user.id,
            //             username: user.username,
            //             full_name: user.full_name,
            //             email: user.email,
            //             picture: user.profile_picture,
            //             description: user.profile_description,
            //             is_followed: isFollowed
            //         };
            //     })
            // );

             
            

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default new SearchController()