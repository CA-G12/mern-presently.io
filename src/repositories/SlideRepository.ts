import Slide from '../models/SlideModel'
import { CreateSlideOptions } from '../interfaces/SlideInterface'

const createSlide = (slide: CreateSlideOptions) => Slide.create({ ...slide })

export default { createSlide }
