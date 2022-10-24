import { NextFunction, Response } from 'express'
import { CreateSlideRequest } from '../interfaces/SlideInterface'
import SlideService from '../services/SlideService'
import { slideSchema } from '../validation/slideValidation'
import { validator } from '../validation/validator'
import GenericError from '../helpers/GenericError'
import { DeleteSlideReqeust } from '../interfaces/SlideInterface'

const createSlide = async (
  req: CreateSlideRequest,
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

    const slide = await SlideService.createSlide({
      link,
      title,
      isPrivate,
      isLive
    })

    res.status(200).send({ message: 'success', slide })
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(exception)
    res.status(400).json({ message: exception.message })
  }
}

const deletePresentation = async (
  req: DeleteSlideReqeust,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    await SlideService.deletePresentation(id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

export default { createSlide, deletePresentation }
