import Slide from '../models/SlideModel'
import { CreateSlideOptions } from 'interfaces/SlideInterface'

const deleteSlide = (id: string) => Slide.findByIdAndDelete(id)
const findSlide = (id: string) => Slide.findById(id)
const createSlide = (slide: CreateSlideOptions) => Slide.create({ ...slide })

export default { deleteSlide, findSlide, createSlide }
