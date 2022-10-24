import Slide from '../models/SlideModel'
import { SlideInterface } from '../interfaces/SlideInterface'
import User from '../models/UserModel'
import mongoose from 'mongoose'

const updateSlide = ({ id, link, isLive, isPrivate, title }: SlideInterface) =>
  Slide.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        link,
        isLive,
        isPrivate
      }
    },
    { new: true }
  )

const checkSlideOwner = (userId: string, slideId: string) => {
  console.log(userId, slideId)
  console.log('slideId', slideId)
  User.findOne({
    'slides._id': '123ea40720dcfa02e0ae42db'
  }).then(u => console.log('here', u))
}

export default { updateSlide, checkSlideOwner }
