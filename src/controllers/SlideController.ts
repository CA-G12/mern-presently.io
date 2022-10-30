import { NextFunction, Response } from 'express'

import SlideService from '../services/SlideService'
import GenericError from '../helpers/GenericError'
import { validator } from '../validation/validator'
import { slideSchema } from '../validation/slideValidation'
import {
  CreateSlideRequest,
  UpdateSlideRequest,
  DeleteSlideRequest
} from '../interfaces/SlideInterface'

const updateSlide = async (
  req: UpdateSlideRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, link, isPrivate, isLive } = req.body
  const { id: slideId } = req.params
  const { id: userId } = res.locals.user

  try {
    const slideOwner = await SlideService.checkSlide(slideId)
    if (slideOwner._id.toString() !== userId) {
      return res.status(403).json({ message: 'unauthorized' })
    }

    const validate = await validator({
      schema: slideSchema,
      data: { title, link, isPrivate, isLive }
    })
    if (!validate.isValid) {
      throw new GenericError(validate.error)
    }

    const updatedUserDocument = await SlideService.updateSlide({
      id: slideId,
      title,
      link,
      isPrivate,
      isLive
    })

    res.status(200).json({ message: 'success', updatedUserDocument })
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(exception)
    res.status(400).json({ message: exception.message })
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

const deletePresentation = async (
  req: DeleteSlideRequest,
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

export default { createSlide, deletePresentation, updateSlide }
