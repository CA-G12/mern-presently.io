import axios from './axios'
import { UserInterface } from '../../../src/interfaces/UserInterface'

export const handleSignup = (data: UserInterface) =>
  axios.post('/users/signup', data)
