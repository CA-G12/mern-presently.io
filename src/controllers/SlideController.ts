import { NextFunction, Response } from 'express'
import { SlideRequestInterface } from '../interfaces/UserInterface'
import SlideService from '../services/SlideService'
const deleteSlide = async (
  req: SlideRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    await SlideService.deleteSlide(req.params.id)
    res.status(204).json({ message: 'success' })
  } catch (error) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(exception)
    return res.status(204).send({ error: exception.message })
  }
}
export default { deleteSlide }
