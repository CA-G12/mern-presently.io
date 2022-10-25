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
  const updatedSlide = await SlideRepository.updateSlide({
    id,
    title,
    link,
    isPrivate,
    isLive
  })

  if (!updatedSlide) {
    throw new GenericError('Update Failed')
  }

  return updatedSlide
}

const deletePresentation = async (id: string) =>
  await SlideRepository.deleteSlide(id)

export default { deletePresentation, createSlide, updateSlide, checkSlide }
