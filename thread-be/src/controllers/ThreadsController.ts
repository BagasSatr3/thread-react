import { Request, Response } from "express";
import ThreadsService from "../service/ThreadsService";

class ThreadsController {
    async find(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession

            const response = await ThreadsService.find(req.query, loginSession)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: "Cannot get data threads!"})
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const loginSession = res.locals.loginSession

            const response = await ThreadsService.findOne(id, loginSession)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: "cannot get data detail thread!" })
        }
    }

    // post(req: Request, res: Response) {
    //     ThreadsService.post(req,res)
    // }

    update(req: Request, res: Response) {
        ThreadsService.update(req,res)
    }
    delete(req: Request, res: Response) {
        ThreadsService.delete(req,res)
    }
}

export default new ThreadsController()