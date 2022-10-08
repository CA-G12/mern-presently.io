import axios from 'axios'
import config from '../config'

const { apiBaseUrl } = config
const instance = axios.create({ baseURL: apiBaseUrl, withCredentials: true })

instance.defaults.headers.post['Content-Type'] = 'application/json'

// request/response interceptors
// instance.interceptors.request.use(config => {
//   return Promise.resolve(config)
// })

// instance.interceptors.response.use(
//   (response) => {},
//   (error) => {}
// );

export default instance
