import * as jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { User } from '../entities/Users'
import { AppDataSource } from '../data-source'
import { Request, Response } from 'express'


export class Token{
    private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User)

   
}
export default new Token()