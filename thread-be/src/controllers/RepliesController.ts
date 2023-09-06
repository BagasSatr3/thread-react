import { Request, Response } from "express";
import RepliesService from "../service/RepliesService";

class RepliesController {
    async find(req: Request, res: Response) {
        try {
            const resp = await RepliesService.find(req.query)
            return res.status(200).json(resp)
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    create(req: Request, res: Response) {
        RepliesService.create(req,res)
    }

}

export default new RepliesController()