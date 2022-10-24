import Slide from '../models/SlideModel'
import { SlideInterface } from '../interfaces/SlideInterface'
import UserRepository from './UserRepository'

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
  const user: any = UserRepository.getUser({ id: userId })
    .populate('slides')
    .exec()

  return user
}
export default { updateSlide, checkSlideOwner }
