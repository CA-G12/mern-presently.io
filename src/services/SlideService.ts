import SlideRepository from '../repositories/SlideRepository'
import GenericError from '../helpers/GenericError'

const deleteSlide = async (id: string) => {
  const slideById = await SlideRepository.findSlide(id)
  if (!slideById) throw new GenericError('slide is not exist')
  await SlideRepository.deleteSlide(id)
}
export default { deleteSlide }
