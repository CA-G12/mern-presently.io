import mongoose from 'mongoose'

import Slide from '../models/SlideModel'
import {
  CreateSlideOptions,
  SlideInterface
} from '../interfaces/SlideInterface'
import User from '../models/UserModel'

const createSlide = (slide: CreateSlideOptions) => Slide.create({ ...slide })

const updateSlide = ({ id, link, isLive, isPrivate, title }: SlideInterface) =>
  User.findOneAndUpdate(
    { 'slides._id': new mongoose.Types.ObjectId(id) },
    {
      $set: {
        'slides.$[elem]': { _id: id, title, isLive, isPrivate, link }
      }
    },
    { arrayFilters: [{ 'elem._id': id }], new: true }
  )

const checkSlide = (slideId: string) =>
  User.findOne({
    'slides._id': new mongoose.Types.ObjectId(slideId)
  })

const deleteSlide = (id: string) => Slide.findByIdAndDelete(id)

const findSlide = (id: string) => User.findOne({ 'slides._id': id })

export default { deleteSlide, createSlide, updateSlide, checkSlide, findSlide }
