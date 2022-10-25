import Slide from '../models/SlideModel'
import {
  CreateSlideOptions,
  SlideInterface
} from '../interfaces/SlideInterface'
import User from '../models/UserModel'
import mongoose from 'mongoose'

const createSlide = (slide: CreateSlideOptions) => Slide.create({ ...slide })

const updateSlide = ({
  id,
  link,
  isLive,
  isPrivate,
  title
}: SlideInterface) => {
  return User.findOneAndUpdate(
    { 'slides._id': new mongoose.Types.ObjectId(id) },
    {
      $set: {
        'slides.$[elem]': { _id: id, title, isLive, isPrivate, link }
      }
    },
    { arrayFilters: [{ 'elem._id': id }], new: true }
  )
}

const checkSlide = (slideId: string) => {
  try {
    const result = User.findOne({
      'slides._id': new mongoose.Types.ObjectId(slideId)
    })

    return result
  } catch (error) {
    console.log(error)
  }
}

const deleteSlide = (id: string) => Slide.findByIdAndDelete(id)

export default { deleteSlide, createSlide, updateSlide, checkSlide }
