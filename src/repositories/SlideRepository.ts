import Slide from '../models/SlideModel'
import { CreatePresentationOptions } from '../interfaces/SlideInterface'

const createPresentation = (options: CreatePresentationOptions) =>
  Slide.create({ ...options })

export default { createPresentation }
