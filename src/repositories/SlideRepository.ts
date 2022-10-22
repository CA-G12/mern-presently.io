import Slide from '../models/SlideModel'
import { SlideInterface } from '../interfaces/SlideInterface'

const updatePresentation = ({
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

export default { updatePresentation }
