import FormData from 'form-data'

import SlideRepository from '../repositories/SlideRepository'
import { CreateSlideOptions, FileInterface } from '../interfaces/SlideInterface'
import SlideHelpers from '../helpers/SlideHelpers'
import GenericError from 'helpers/GenericError'

const createSlide = async ({
  title,
  link,
  isLive,
  isPrivate
}: CreateSlideOptions) =>
  await SlideRepository.createSlide({ title, link, isLive, isPrivate })

const deletePresentation = async (id: string) =>
  await SlideRepository.deleteSlide(id)

const uploadSlide = async (
  file: Express.Multer.File | FileInterface | undefined
): Promise<{ secure_url: string }> => {
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

const addSlide = async (id: string, link: string) => {
  const linkSegment = link.split('/')[1]

  const slide = await SlideRepository.createSlide({
    link: linkSegment
  })

  return SlideRepository.addSlide(slide, id)
}
export default { deletePresentation, createSlide, uploadSlide, addSlide }
