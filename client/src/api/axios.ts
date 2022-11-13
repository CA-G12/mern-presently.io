import axios from 'axios'
import config from '../config'
import JWTHelpers from '../helpers/JWTHelpers'

const { apiBaseUrl } = config
const instance = axios.create({ baseURL: apiBaseUrl, withCredentials: true })

instance.interceptors.request.use(
  config => {
    if (!config.headers) {
      throw new Error()
    }
    config.headers['x-access-token'] = `Bearer ${JWTHelpers.getToken()}`
    return Promise.resolve(config)
  },
  error => {
    return Promise.reject(error)
  }
)
// instance.interceptors.response.use(
//   (response) => {},
//   (error) => {}
// );

export default instance
