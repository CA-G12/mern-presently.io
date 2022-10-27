import Slide from '../models/SlideModel'
import { CreateSlideOptions } from '../interfaces/SlideInterface'
import User from '../models/UserModel'

const createSlide = (slide: CreateSlideOptions) => Slide.create({ ...slide })

const deleteSlide = (id: string) => Slide.findByIdAndDelete(id)

const addSlide = (slide: CreateSlideOptions, id: string) =>
  User.findOneAndUpdate(
    { _id: id },
    { $push: { slides: slide } },
    { new: true }
  )

export default { deleteSlide, createSlide, addSlide }
