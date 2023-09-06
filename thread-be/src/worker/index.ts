import { AppDataSource } from "../data-source";
import * as amqp from "amqplib"
import cloudinaryConfig from '../libs/cloudinary';

class workerHub {
    constructor() {
    AppDataSource.initialize().then(async () => {
        cloudinaryConfig()
        const connection = await amqp.connect('ampq://localhost')

        ThreadWorker.create("thread-queue", connection)
    })
    .catch((error) => console.log(error))
    }
}

export default new workerHub()