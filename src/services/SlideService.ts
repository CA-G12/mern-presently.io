import FormData from 'form-data'

import SlideRepository from '../repositories/SlideRepository'
import SlideHelpers from '../helpers/SlideHelpers'
import GenericError from '../helpers/GenericError'
import {
  CreateSlideOptions,
  SlideInterface,
  FileInterface
} from '../interfaces/SlideInterface'

const createSlide = async ({
  title,
  link,
  isLive,
  isPrivate
}: CreateSlideOptions) =>
  await SlideRepository.createSlide({ title: title, link, isLive, isPrivate })

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

const uploadSlide = async (
  file: Express.Multer.File | FileInterface | undefined
): Promise<string> => {
  if (!file) {
    throw new GenericError('file not provided')
  }
  const { size, originalname } = file

  const form = new FormData()
  form.append('fieldname', 'file')
  form.append('originalname', originalname)
  form.append('encoding', '7bit')
  form.append('mimetype', 'text/markdown')
  form.append('destination', 'assets/')
  form.append('filename', 'latestPresentation')
  form.append('path', 'assets/')
  form.append('size', size)

  return SlideHelpers.uploadFile()
}

const addSlideToUser = async (id: string, link: string) => {
  const linkSegment = link.split('/')[1]

  const slide = await SlideRepository.createSlide({
    link: linkSegment
  })

  return SlideRepository.addSlideToUser(slide, id)
}
export default { deletePresentation, createSlide, updateSlide, checkSlide, uploadSlide, addSlideToUser}
