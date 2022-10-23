import { SlideInterface } from '../interfaces/SlideInterface'
import SlidesRepository from '../repositories/SlideRepository'
import GenericError from '../helpers/GenericError'

const updateSlide = async ({
  id,
  title,
  link,
  isPrivate,
  isLive
}: SlideInterface) => {
  const updatedSlide = await SlidesRepository.updateSlide({
    id,
    title,
    link,
    isPrivate,
    isLive
  })

  if (!updatedSlide) {
    throw new GenericError('Slide not found')
  }

  return updatedSlide
}

export default { updateSlide }
