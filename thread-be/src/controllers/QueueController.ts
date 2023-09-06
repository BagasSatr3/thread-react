import * as amqp from "amqplib";
import { Request, Response } from "express";

class QueueController {
    // private readonly threadRepository: Repository<Thread> =
    // AppDataSource.getRepository(Thread)

    async enqueue(req: Request, res: Response) {
        try {
            const content = req.body.content
            const filename = res.locals.filename
            const loginSession = res.locals.loginSession

            const data = {
                content: content,
                image: filename,
                user_id: loginSession.userId
              };
            
            const payload = JSON.stringify(data)
            console.log(data.user_id)
            console.log(payload)
            
            const connection = await amqp.connect("amqp://localhost")
            const channel = await connection.createChannel()

            await channel.assertQueue("thread-queue")
            channel.sendToQueue("thread-queue", Buffer.from(payload))
            

            await channel.close()
            await connection.close()

            res.status(200).json({
                message: "Thread is queued!",
            })
        } catch (error) {
            console.error("Error enqueueing message:", error) 
            res.status(500).json({
                error: "Something wrong in server!"
            })
        }
    }
}

export default new QueueController()