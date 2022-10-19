import Slide from '../models/SlideModel'
import { AddPresentationOptions } from '../interfaces/SlideInterface'

const addPresentation = (options: AddPresentationOptions) =>
  Slide.create({ ...options })

export default { addPresentation }
