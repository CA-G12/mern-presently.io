import SlideRepository from '../repositories/SlideRepository'
import { CreatePresentationOptions } from '../interfaces/SlideInterface'

const createPresentation = async ({
  title,
  link,
  isLive,
  isPrivate
}: CreatePresentationOptions) =>
  await SlideRepository.createPresentation({ title, link, isLive, isPrivate })

export default { createPresentation }
