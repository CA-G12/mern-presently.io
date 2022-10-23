import User from '../models/UserModel'
import { UserInterface, GetUserOptions } from '../interfaces/UserInterface'

const createUser = (user: Omit<UserInterface, 'id'>) => User.create(user)
const getUser = (options: GetUserOptions) => User.findOne({ ...options })

export default { createUser, getUser }
