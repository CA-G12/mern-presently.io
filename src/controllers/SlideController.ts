import { NextFunction, Response } from 'express'
import { CreatePresentationRequest } from '../interfaces/SlideInterface'
import SlideService from '../services/SlideService'
import { slideSchema } from '../validation/slideValidation'
import { validator } from '../validation/validator'
import GenericError from '../helpers/GenericError'

const createPresentation = async (
  req: CreatePresentationRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, link, isPrivate, isLive } = req.body

    const validate = await validator({
      schema: slideSchema,
      data: { title, link, isPrivate, isLive }
    })

    if (!validate.isValid) {
      throw new GenericError(validate.error)
    }

    const presentation = await SlideService.createPresentation({
      link,
      title,
      isPrivate,
      isLive
    })

    res.status(200).send({ message: 'success', presentation })
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(exception)
    res.status(400).json({ message: exception.message })
  }
}

export default { createPresentation }
