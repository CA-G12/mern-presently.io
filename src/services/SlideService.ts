import FormData from 'form-data'
import MarkdownIt from 'markdown-it'
import axios from 'axios'

import SlideRepository from '../repositories/SlideRepository'
import SlideHelpers from '../helpers/SlideHelpers'
import GenericError from '../helpers/GenericError'
import {
  CreateSlideService,
  SlideInterface,
  FileInterface
} from '../interfaces/SlideInterface'
import mdOptions from '../config/md'

const createSlide = async ({
  userId,
  title,
  link,
  isLive,
  isPrivate
}: CreateSlideService) => {
  let linkSlug = link

  if (link.includes('rebrand.ly')) {
    linkSlug = link.split('/')[1]
  }

  const slide = await SlideRepository.createSlide({
    title: title,
    link: linkSlug,
    isLive,
    isPrivate
  })

  console.log(slide)

  return SlideRepository.addSlideToUser(slide, userId)
}

const checkSlide = async (slideId: string) => {
  const isSlide = await SlideRepository.checkSlide(slideId)
  if (isSlide) {
    return isSlide
  } else throw new GenericError('Slide not found')
}

const getSlide = async (id: string) => {
  const userDocument = await SlideRepository.findSlide(id)

  return userDocument
}

const getSlideHtmlContent = async (link: string) => {
  let slideLink = link

  if (!link.includes('cloudinary')) {
    slideLink = `https://rebrand.ly/${link}`
  }

  const mdContent = await axios.get(slideLink)

  const md = new MarkdownIt(mdOptions)

  const htmlContent = md.render(mdContent.data)

  return htmlContent
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

const deleteSlide = async (id: string) => await SlideRepository.deleteSlide(id)

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

export default {
  deleteSlide,
  createSlide,
  updateSlide,
  checkSlide,
  getSlide,
  uploadSlide,
  addSlideToUser,
  getSlideHtmlContent
}
