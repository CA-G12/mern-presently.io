import axios from 'axios'
import config from '../config'
import JWTHelpers from '../helpers/JWTHelpers'

const { apiBaseUrl } = config
const instance = axios.create({ baseURL: apiBaseUrl, withCredentials: true })

instance.defaults.headers.common[
  'x-access-token'
] = `Bearer ${JWTHelpers.getToken()}`

// request/response interceptors
instance.interceptors.request.use(config => {
  return Promise.resolve(config)
})

// instance.interceptors.response.use(
//   (response) => {},
//   (error) => {}
// );

export default instance
