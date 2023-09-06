import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from '../entities/Users';
import { Thread } from "../entities/Threads";

class UserService {
    private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User)

    private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread)

    async find(req: Request, res: Response) {
        try {
            const users = await this.userRepository.find()
            return res.status(200).json(users)
        } catch (err) {
            return res.status(500).json({ error: "error while getting users" })
        }
    }

    async profile(req: Request, res: Response) {
        try {
            const results = await this.userRepository.findOne({
                where: {
                    id: Number(req.params.id)
                },
                relations: ["threads", "threads.user"]
            })
            return res.send(results)
        } catch (err) {
            return res.status(500).json({ error: "error while getting users" })
        }
    }

    async post(req: Request, res: Response) {
        // try {
            const user = this.userRepository.create(req.body)
            const results = this.userRepository.save(user)
            return res.send(results)
        // } catch (err) {
        //     return res.status(500).json({ error: "error while posting users" })
        // }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const user = await this.userRepository.findOneBy({
                id: id
            })
            this.userRepository.merge(user, req.body)
            const results = await this.userRepository.save(user)
            return res.send(results)
        } catch (err) {
            return res.status(500).json({ error: "error while updating users" })
        }
    }

    async delete(req: Request, res: Response) {
        const results = await this.userRepository.delete(req.params.id)
        return res.send(results)
    }
}

export default new UserService()