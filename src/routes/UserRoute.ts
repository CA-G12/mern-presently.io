import express from 'express'
import createUser from '../controllers/UserController'

export const userRouter = express.Router()

userRouter.post('/signup', createUser)
