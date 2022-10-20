import { SlideInterface } from '../interfaces/SlideInterface'
import SlidesRepository from '../repositories/SlideRepository'
import GenericError from '../helpers/GenericError'

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
    throw new GenericError('Slide not found')
  }

  return updatededPresentaion
}

export default { updatePresentaion }
