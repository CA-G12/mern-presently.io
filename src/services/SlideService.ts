import { SlideInterface } from '../interfaces/SlideInterface'
import SlidesRepository from '../repositories/SlideRepository'
import GenericError from '../helpers/GenericError'

const updatePresentation = async ({
  id,
  title,
  link,
  isPrivate,
  isLive
}: SlideInterface) => {
  const updatedPresentation = await SlidesRepository.updatePresentation({
    id,
    title,
    link,
    isPrivate,
    isLive
  })

  if (!updatedPresentation) {
    throw new GenericError('Slide not found')
  }

  return updatedPresentation
}

export default { updatePresentation }
