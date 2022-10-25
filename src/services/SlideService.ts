import { onSlideOperations } from '../interfaces/SlideInterface'
import SlideRepository from '../repositories/SlideRepository'
import GenericError from '../helpers/GenericError'

const updateSlide = async ({
  userId,
  id,
  title,
  link,
  isPrivate,
  isLive
}: onSlideOperations) => {
  const isAuthorized = await checkSlideOwner(userId, id)
  console.log('isAuthorized', isAuthorized)
  if (!isAuthorized) {
    throw new GenericError('Unauthorized')
  }

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
  const checkSlideOwner = await SlideRepository.isSlideOwner(userId, slideId)
  console.log(' in checkSlideOwner service', checkSlideOwner)

  if (checkSlideOwner.length > 0) return true
  return false
}

export default { updateSlide, checkSlideOwner }
