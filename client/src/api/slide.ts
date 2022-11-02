import axios from './axios'

export const uploadSlide = (file: FormData) => {
  return axios.post('/slides/upload', file)
}
