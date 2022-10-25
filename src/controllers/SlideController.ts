import { NextFunction, Response } from 'express'
import SlideService from '../services/SlideService'
import { UpdateSlideRequest } from '../interfaces/SlideInterface'
import { slideSchema } from '../validation/slideValidation'
import { validator } from '../validation/validator'
import GenericError from '../helpers/GenericError'

const updateSlide = async (
  req: UpdateSlideRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, link, isPrivate, isLive } = req.body
  const { id: slideId } = req.params
  const { id: userId } = res.locals.user

  try {
    const validate = await validator({
      schema: slideSchema,
      data: { title, link, isPrivate, isLive }
    })
    if (!validate.isValid) {
      throw new GenericError(validate.error)
    }

    const updatedSlide = await SlideService.updateSlide({
      userId,
      id: slideId,
      title,
      link,
      isPrivate,
      isLive
    })

    res.status(200).json({ message: 'success', slide: updatedSlide })
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(exception)
    res.status(400).json({ message: exception.message })
  }
}

export default { updateSlide }
