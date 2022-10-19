import Slide from '../models/SlideModel'
import { CreatePresentationOptions } from '../interfaces/SlideInterface'

const createPresentation = (presentation: CreatePresentationOptions) =>
  Slide.create({ ...presentation })

export default { createPresentation }
