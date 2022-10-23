import SlideRepositry from '../repositories/SlideRepositry'
import GenericError from '../helpers/GenericError'
import { CreateSlideOptions } from '../interfaces/SlideInterface'

const createSlide = async ({
  title,
  link,
  isLive,
  isPrivate
}: CreateSlideOptions) =>
  await SlideRepositry.createSlide({ title, link, isLive, isPrivate })

const deleteSlide = async (id: string) => {
  const slideById = await SlideRepositry.findSlide(id)
  if (!slideById) throw new GenericError('slide is not exist')
  await deleteSlide(id)
}
export default { deleteSlide, createSlide }
