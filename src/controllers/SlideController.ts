import { NextFunction, Response } from 'express'
import SlidesService from '../services/SlideService'
import { UpdatePresentaionRequest } from '../interfaces/SlideInterface'

const updatePresentation = async (
  req: UpdatePresentaionRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { title, link, isPrivate, isLive } = req.body

  try {
    const updatededPresentaion = await SlidesService.updatePresentaion({
      id,
      title,
      link,
      isPrivate,
      isLive
    })

    res
      .status(200)
      .json({ message: 'Edited Successfuly', slide: updatededPresentaion })
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(error)
    res.status(404).json({ message: exception.message })
  }
}

export { updatePresentation }
