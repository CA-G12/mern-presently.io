import axios from './axios'

export const deleteSlide = (id: string) => axios.delete(`/slides/${id}`)
