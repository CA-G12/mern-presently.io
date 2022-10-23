import { NextFunction, Response, Request } from 'express'
import SlideService from '../services/SlideService'
const deletePresentation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await SlideService.deletePresentation(req.params.id)
    res.status(204).json({ message: 'success' })
  } catch (error: unknown) {
    const exception = error as Error
    if (exception.name !== 'GenericError') return next(exception)
    return res.status(204).send({ error: exception.message })
  }
}
export default { deletePresentation }
