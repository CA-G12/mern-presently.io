import SlideRepository from '../repositories/SlideRepository'
import GenericError from '../helpers/GenericError'
import {
  CreateSlideOptions,
  SlideInterface
} from '../interfaces/SlideInterface'

const createSlide = async ({
  title,
  link,
  isLive,
  isPrivate
}: CreateSlideOptions) =>
  await SlideRepository.createSlide({ title, link, isLive, isPrivate })

const checkSlide = async (slideId: string) => {
  const isSlide = await SlideRepository.checkSlide(slideId)

  if (isSlide) {
    return isSlide
  } else throw new GenericError('Slide not found')
}

const updateSlide = async ({
  id,
  title,
  link,
  isPrivate,
  isLive
}: SlideInterface) => {
  const updatedUserDocument = await SlideRepository.updateSlide({
    id,
    title,
    link,
    isPrivate,
    isLive
  })

  if (!updatedUserDocument) {
    throw new GenericError('Update Failed')
  }

  return updatedUserDocument
}

const deletePresentation = async (id: string) =>
  await SlideRepository.deleteSlide(id)

export default { deletePresentation, createSlide, updateSlide, checkSlide }
