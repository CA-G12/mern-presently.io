import axios from './axios'
import { UserInterface } from '../../../src/interfaces/UserInterface'
export const handleSignup = (data: UserInterface) => {
  try {
    return axios.post('/signup', data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errorMessage
    if (error.response.status) {
      errorMessage = error.message
    } else errorMessage = 'error occured'
  }
}
