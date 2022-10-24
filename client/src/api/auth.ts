import axios from './axios'
import { UserInterface } from '../../../src/interfaces/UserInterface'
import { Credentials } from '../interfaces/CredentialInterface'

export const handleSignup = (data: Omit<UserInterface, 'id'>) =>
  axios.post('/users/signup', data)

export const authenticate = ({ email, password }: Credentials) => {
  return axios({
    method: 'post',
    url: '/auth/authenticate',
    data: { email, password }
  })
}
