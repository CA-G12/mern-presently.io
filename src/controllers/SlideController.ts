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
  const { id } = req.params
  const { title, link, isPrivate, isLive } = req.body

  const validate = await validator({
    schema: slideSchema,
    data: { title, link, isPrivate, isLive }
  })
  console.log(validate.isValid)
  if (!validate.isValid) {
    throw new GenericError(validate.error)
  }

  try {
    const updatedSlide = await SlideService.updateSlide({
      id,
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
