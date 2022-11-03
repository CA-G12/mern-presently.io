import User from '../models/UserModel'
import {
  UserInterface,
  GetUserFilter,
  GetUserOptions
} from '../interfaces/UserInterface'

const createUser = (user: Omit<UserInterface, 'id'>) => User.create(user)

const getUser = (filter: GetUserFilter = {}, options: GetUserOptions = {}) =>
  User.findOne(filter, options)

export default { createUser, getUser }
