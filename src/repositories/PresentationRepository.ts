import Slide from '../models/SlideModel'
import { SlideInterface } from '../interfaces/SlideInterface'

const updatePresentaion = ({
  id,
  link,
  isLive,
  isPrivate,
  title
}: SlideInterface) =>
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

export default { updatePresentaion }
