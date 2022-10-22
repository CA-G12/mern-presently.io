import axios from './axios'
import { UserInterface } from '../../../src/interfaces/UserInterface'

export const handleSignup = (data: Omit<UserInterface, 'id'>) =>
  axios.post('/users/signup', data)
