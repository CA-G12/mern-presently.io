import User from '../models/UserModel'
import { UserInterface } from 'interfaces/UserInterface'
import { UserOptions } from 'interfaces/UserInterface'

export const createUser = (user: UserInterface) => User.create(user)
export const getUser = (options: UserOptions) => User.findOne({ ...options })
