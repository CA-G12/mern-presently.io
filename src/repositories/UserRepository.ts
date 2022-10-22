import User from '../models/UserModel'
import { UserInterface, UserOptions } from '../interfaces/UserInterface'

const createUser = (user: Omit<UserInterface, 'id'>) => User.create(user)
const getUser = (options: UserOptions) => User.findOne({ ...options })

export default { createUser, getUser }
