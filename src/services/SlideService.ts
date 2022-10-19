import SlideRepository from '../repositories/SlideRepository'
import { AddPresentationOptions } from '../interfaces/SlideInterface'

const addPresentation = async ({
  title,
  link,
  isLive,
  isPrivate
}: AddPresentationOptions) =>
  await SlideRepository.addPresentation({ title, link, isLive, isPrivate })

export default { addPresentation }
