import { Thread } from './../entities/Threads';
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary"
import CloudinaryConfig from '../libs/cloudinary';
import { upload } from '../middleware/FileUpload';
class ThreadService {
    private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread)

    async find(reqQuery?: any, loginSession?: any): Promise<any> {
        try {
            const limit = parseInt(reqQuery.limit ?? 0)

            const threads = await this.threadRepository.find({
                relations: [
                    "user",
                    "likes.user",
                    "replies"
                ],
                order: {
                    id: "DESC"
                },
                take: limit
            })

            return threads.map((element) => ({
                id: element.id,
                content: element.content,
                image: element.image,
                posted_at: element.posted_at,
                user: element.user,
                replies_count: element.replies.length,
                likes_count: element.likes.length,
                is_liked: element.likes.some(
                    (like: any) => like.user.id === loginSession.userId
                )
            }))
        } catch (error) {
            throw new Error("Server Error!")
        }
    }

    

    async findOne(id: number, loginSession?: any): Promise<any> {
        try {
            const thread = await this.threadRepository.findOne({
                where: {
                    id: id
                },
                relations: [
                    "user",
                    "replies",
                    "likes.user"
                ]
            })

            return {
                id: thread.id,
                content: thread.content,
                image: thread.image,
                posted_at: thread.posted_at,
                user: thread.user,
                replies_count: thread.replies.length,
                likes_const: thread.likes.length,
                is_liked: thread.likes.some(
                    (like: any) => like.user.id === loginSession.userId
                )
            }
        } catch (error) {
            throw new Error("Server Error!")
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const thread = await this.threadRepository.findOneBy({
                id: id
            })
            this.threadRepository.merge(thread, req.body)
            const results = await this.threadRepository.save(thread)
            return res.send(results)
        } catch (err) {
            return res.status(500).json({ error: "error while updating threads" })
        }
    }

    async delete(req: Request, res: Response) {
        const results = await this.threadRepository.delete(req.params.id)
        return res.send(results)
    }

    // async find(req: Request, res: Response) {
    //     try {
    //         const threads = await this.threadRepository.find(
    //             { relations: [
    //                 'user', 
    //                 "replies", 
    //                 "likes"
    //                 ],
    //                 order: {id: "DESC"}
    //             }
    //         )

            // let ressa = []

            // threads.forEach((element) => {
            //     ressa.push({
            //         ...element,
            //         likes_count: element.likes.length,
            //         replies_count: element.replies.length,
            //     })
            // });

    //         return res.status(200).json(threads)
    //     } catch (err) {
    //         return res.status(500).json({ error: "error while getting threads" })
    //     }
    // }
    
    // async findOne(req: Request, res: Response) {
    //     try {
    //         const results = await this.threadRepository.findOne({
    //             where: {
    //                 id: Number(req.params.id),
    //             },
                
    //             relations: ['user']
    //         })

    //         let ressa = []

            // threads.forEach((element) => {
            //     ressa.push({
            //         ...element,
            //         likes_count: element.likes.length,
            //         replies_count: element.replies.length,
            //     })
            // });

    //         return res.send(results)
    //     } catch (err) {
    //         return res.status(500).json({ error: "error while getting threads" })
    //     }
    // }

    async post(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession
            const filename = res.locals.filename
            const data = req.body

            // CloudinaryConfig()
            
            
          
            cloudinary.config({ 
                cloud_name: 'dlkgkipax', 
                api_key: '371515624215563', 
                api_secret: '2brsnHMo64nR2G7AMw133GDij-k' 
            });
            
            if (filename) {
                const cloudinaryResponse = await cloudinary.uploader.upload(
                    "./uploads/" + filename
                )
    
                const thread = this.threadRepository.create({
                    content: data.content,
                    image: cloudinaryResponse.secure_url,
                    user: loginSession.userId
                })
    
                const results = await this.threadRepository.save(thread)
                return res.json({results})
            } else {
                const thread = this.threadRepository.create({
                    content: data.content,
                    user: loginSession.userId
                })
    
                const results = await this.threadRepository.save(thread)
                return res.json({results})
            }
            
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    }

    
}

export default new ThreadService()