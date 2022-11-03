import axios from './axios'

export const deleteSlide = (id: string) => axios.delete(`/slides/${id}`)

export const uploadSlide = (file: FormData) => {
  return axios.post('/slides', file)
}
