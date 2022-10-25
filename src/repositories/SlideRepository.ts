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

const isSlideOwner = (userId: string, slideId: string) => {
  console.log(userId, slideId)
  console.log('slideId', slideId)
  User.findOne({
    'slides._id': new mongoose.Types.ObjectId(slideId)
  }).then(u => console.log('here', u))

  return ''
}

export default { updateSlide, isSlideOwner }
