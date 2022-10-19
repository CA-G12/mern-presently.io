import axios from './axios'
import { Credentials } from '../interfaces/CredentialInterface'

export const authenticate = ({ email, password }: Credentials) => {
  return axios({
    method: 'post',
    url: '/auth/authenticate',
    data: { email, password }
  })
}
