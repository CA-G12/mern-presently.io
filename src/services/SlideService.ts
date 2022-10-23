import SlideRepository from '../repositories/SlideRepository'
import { CreateSlideOptions } from '../interfaces/SlideInterface'

const createSlide = async ({
  title,
  link,
  isLive,
  isPrivate
}: CreateSlideOptions) =>
  await SlideRepository.createSlide({ title, link, isLive, isPrivate })

export default { createSlide }
