import { SlideInterface } from '../interfaces/SlideInterface'
import SlideRepository from '../repositories/SlideRepository'
import GenericError from '../helpers/GenericError'

const updateSlide = async ({
  id,
  title,
  link,
  isPrivate,
  isLive
}: SlideInterface) => {
  const updatedSlide = await SlideRepository.updateSlide({
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

const checkSlideOwner = async (userId: string, slideId: string) => {
  const checkSlideOwner = await SlideRepository.checkSlideOwner(userId, slideId)
  console.log(' in service', checkSlideOwner)
  return checkSlideOwner
}

export default { updateSlide, checkSlideOwner }
