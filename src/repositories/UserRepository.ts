import User from '../models/UserModel'
import { GetUserOptions } from '../interfaces/UserInterface'

const getUser = (options: GetUserOptions) => User.findOne({ ...options })

export default { getUser }
