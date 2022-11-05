import axios from './axios'

export const deleteSlide = (id: string) => axios.delete(`/slides/${id}`)

export const uploadSlide = (file: FormData) => {
  return axios.post('/slides', file)
}

export const shareLink = (id: string) => axios.get(`/slides/share/${id}`)

export const getSlide = (id: string) => axios.get(`/slides/${id}`)
