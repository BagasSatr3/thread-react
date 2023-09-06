import * as amqp from "amqplib"
// import "reflect-metadata";
import { v2 as cloudinary } from "cloudinary"
import { Thread } from "../entities/Threads";
import { AppDataSource } from "../data-source";
import { Connection, DataSource, Repository, createConnection, getRepository } from "typeorm";
// class proccess {
//     private readonly threadRepository: Repository<Thread> =
//     AppDataSource.getRepository(Thread)
    export async function processQueue() {
        try {
            cloudinary.config({ 
                cloud_name: 'dlkgkipax', 
                api_key: '371515624215563', 
                api_secret: '2brsnHMo64nR2G7AMw133GDij-k', 
                secure: true
            });

            const rabbitConnection = await amqp.connect("amqp://localhost")
            const channel = await rabbitConnection.createChannel()
            
            await channel.assertQueue("thread-queue")
            
            await channel.consume("thread-queue", async (message) => {        
            if(message !== null) {
                try {
                    const payload = JSON.parse(message.content.toString())
                    console.log("Received", payload)

                    const cloudinaryResponse = await cloudinary.uploader.upload(
                        "./uploads/" + payload.image
                    )
                    console.log(cloudinaryResponse)
                        
                    const thread = AppDataSource.getRepository(Thread).create({
                        content: payload.content,
                        image: cloudinaryResponse.secure_url,
                        user: payload.user_id
                    })
                    console.log("Received Create", thread)
                    console.log("Received user", thread.user)
        
                    const result = await AppDataSource.getRepository(Thread).save(thread)
                    

                    channel.ack(message)
                } catch (error) {
                    console.error("Error worker:", error)
                }
            }
        })
        } catch (error) {
            console.error("Error prorcessing queue:", error)
        }
    }
// }

// const pro = new proccess()
AppDataSource.initialize().then(async() => {
    processQueue()
}).catch(error => console.log(error))
