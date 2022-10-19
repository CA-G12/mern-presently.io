import User from '../models/UserModel'
import { UserInterface } from 'interfaces/UserInterface'
import { UserOptions } from 'interfaces/UserInterface'

const createUser = (user: UserInterface) => User.create(user)
const getUser = (options: UserOptions) => User.findOne({ ...options })

export default { createUser, getUser }
