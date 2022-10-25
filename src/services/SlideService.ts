import SlideRepository from '../repositories/SlideRepository'
import GenericError from '../helpers/GenericError'
import {
  CreateSlideOptions,
  onSlideOperations
} from '../interfaces/SlideInterface'

const createSlide = async ({
  title,
  link,
  isLive,
  isPrivate
}: CreateSlideOptions) =>
  await SlideRepository.createSlide({ title, link, isLive, isPrivate })

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

const deletePresentation = async (id: string) =>
  await SlideRepository.deleteSlide(id)

export default { deletePresentation, createSlide, updateSlide, checkSlideOwner }
