import SlideRepository from '../repositories/SlideRepository'
const deletePresentation = async (id: string) =>
  await SlideRepository.deleteSlide(id)
export default { deletePresentation }
