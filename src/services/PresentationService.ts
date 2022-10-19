import { SlideInterface } from '../interfaces/SlideInterface'
import SlidesRepository from '../repositories/PresentationRepository'
// TODO: import GenericError from '../helpers/GenericError'

const updatePresentaion = async ({
  id,
  title,
  link,
  isPrivate,
  isLive
}: SlideInterface) => {
  const updatededPresentaion = await SlidesRepository.updatePresentaion({
    id,
    title,
    link,
    isPrivate,
    isLive
  })

  if (!updatededPresentaion) {
    // TODO: throw new GenericError('Failed to edit this presentation')
  }
  return updatededPresentaion
}

export default { updatePresentaion }
