import { NextFunction, Response } from 'express'
import { SlideRequestInterface } from '../interfaces/UserInterface'
import { CreateSlideRequest } from '../interfaces/SlideInterface'
import SlideService from '../services/SlideService'
import { slideSchema } from '../validation/slideValidation'
import { validator } from '../validation/validator'
import GenericError from '../helpers/GenericError'

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

export default { createSlide, deleteSlide }
