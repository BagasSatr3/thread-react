import * as express from 'express'
import { Request, Response } from 'express'
import ThreadsController from '../controllers/ThreadsController'
import AuthController from '../controllers/AuthController'
import verifyToken from '../middleware/VerifyToken'
import { upload } from '../middleware/FileUpload'
import RepliesController from '../controllers/RepliesController'
import QueueController from '../controllers/QueueController'
import LikesController from '../controllers/LikesController'
import FollowsController from '../controllers/FollowsController'
import UserController from '../controllers/UserController'
import SearchController from '../controllers/SearchController'

const router = express.Router()

router.get("/", ( req: Request, res: Response) => {
    res.send("Hello from v1!")
})

// router.get("/threads", (req: Request, res:Response) => {
//     res.status(200).json({
//         message: "Hello this is threads!"
//     })
// })

router.get("/threads", verifyToken, ThreadsController.find)
router.get("/threads/:id",verifyToken, ThreadsController.findOne)
// router.post("/threads", verifyToken, ThreadsController.post)
// router.post("/threads", verifyToken, upload('image'), ThreadsController.post)
router.post("/threads",verifyToken, upload('image'), QueueController.enqueue)
router.put("/threads/:id",verifyToken, ThreadsController.update)
router.delete("/threads/:id",verifyToken, ThreadsController.delete)

// router.get("/replies", verifyToken, RepliesController.find)

router.get("/user",verifyToken, UserController.find)
router.get("/user/:id",verifyToken, UserController.profile)
router.post("/user",verifyToken, UserController.post)
router.put("/user/:id",verifyToken, UserController.update)
router.delete("/user/:id",verifyToken, UserController.delete)

// router.get("/auth", AuthController.find)
router.post("/auth/register", AuthController.register)
router.post("/auth/login", AuthController.login)
router.get("/auth/check", verifyToken, AuthController.check)
// router.delete("/auth/logout/:id", AuthController.logout)

router.get("/replies",verifyToken, RepliesController.find)
router.post("/replies",verifyToken, RepliesController.create)

router.post("/like", verifyToken, LikesController.create)
router.delete("/like/:threadsId", verifyToken, LikesController.delete)

router.get("/follows", verifyToken, FollowsController.find)
router.post("/follow", verifyToken, FollowsController.create)
router.delete("/follow/:followed_user_id", verifyToken, FollowsController.delete)

router.get("/search", verifyToken, SearchController.search)

export default router