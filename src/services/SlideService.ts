import SlideRepository from '../repositories/SlideRepository'
import GenericError from '../helpers/GenericError'
import { CreateSlideOptions } from '../interfaces/SlideInterface'

const createSlide = async ({
  title,
  link,
  isLive,
  isPrivate
}: CreateSlideOptions) =>
  await SlideRepository.createSlide({ title, link, isLive, isPrivate })

const deleteSlide = async (id: string) => {
  const slideById = await SlideRepository.findSlide(id)
  if (!slideById) throw new GenericError('slide is not exist')
  await SlideRepository.deleteSlide(id)
}
export default { deleteSlide, createSlide }
