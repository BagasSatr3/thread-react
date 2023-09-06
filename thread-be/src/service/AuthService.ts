import { Repository } from "typeorm";
import { User } from "../entities/Users";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import Joi = require("joi");
import { userSchema } from "../utils/Validations";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"


class AuthService {
    private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User)
    
    async find(req: Request, res: Response) {
        try {
            const user = await this.userRepository.find()
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json({ error: "error while getting users" })
        }
    }

    async register(req: Request, res: Response) {
        try {
            const data = req.body
            const email = req.body.email
            const password = req.body.password

            const salt = await bcrypt.genSalt()
            const hashed = await bcrypt.hash(password, salt)

            const {error, value} =  userSchema.validate(data)
            const valid = error == null

            const user = await this.userRepository.create({
                full_name: data.full_name,
                username: data.username,
                password: hashed,
                profile_picture: data.profile_picture,
                profile_description: data.profile_description,
                email: data.email,
            })

            const existingEmail = await this.userRepository.findOne({where:{email}})

            if (existingEmail) {
                return res.status(400).json({ error: 'Email already exists' });
            } else if (!valid){
                const validate = error.details[0].message
                return res.send(validate)
            } else {
                const results = await this.userRepository.save(user)
                return res.send(results)
            }
            
        } catch (err) {
            return res.status(500).send(err)
        }
    }


    async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body
            const user = await this.userRepository.findOne({where:{email}})
            if(!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            const comparePass = await bcrypt.compare(password, user.password)

            const userId = user.id
            const username = user.username
            const emailT = user.email
            const full_name = user.full_name
            const profile_description = user.profile_description
            const secretKey = "adalahmanjur"

            const token = jwt.sign({userId, username, emailT, full_name, profile_description}, secretKey,{
                expiresIn: '1h'
            })

            if (comparePass){
                // console.log("Authentication", accessToken)
                res.json({ token } );
            } else {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

        } catch (err) {
            return res.status(500).json({ error: 'An error occurred' });
        }
    }

    async check(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession
            const user = await this.userRepository.findOne({
                where:{
                    id: loginSession.userId
                }
            })

            return res.status(200).json({user, message:"Token is valid"})
        } catch(err) {
            return res.status(500).json("Something wrong in server")
        }
    }
}

export default new AuthService()