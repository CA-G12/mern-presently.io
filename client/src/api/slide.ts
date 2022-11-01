import axios from './axios'

export const uploadSlide = (file: FormData) => {
  console.log(file.get('uploadedFile'))
  return axios.post('/slides/upload', file)
}
