import { Request, Response } from "express";
import LikesService from "../service/LikesService";

class LikeController {
    async create(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession

            const response = await LikesService.create(req.body, loginSession)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: "sit amet" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession
            const threadsId = parseInt(req.params.threadsId)

            const response = await LikesService.delete(threadsId, loginSession)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: "lorem"})
        }
    }
}

export default new LikeController()