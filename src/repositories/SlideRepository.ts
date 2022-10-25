import Slide from '../models/SlideModel'
import { CreateSlideOptions } from '../interfaces/SlideInterface'

const createSlide = (slide: CreateSlideOptions) => Slide.create({ ...slide })

const deleteSlide = (id: string) => Slide.findByIdAndDelete(id)

export default { deleteSlide, createSlide }
