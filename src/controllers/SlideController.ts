import { NextFunction, Response } from 'express'

import { CreateSlideRequest } from '../interfaces/SlideInterface'
import SlideService from '../services/SlideService'
import { slideSchema, shortenLinkSchema } from '../validation/slideValidation'
import { validator } from '../validation/validator'
import GenericError from '../helpers/GenericError'
import { DeleteSlideRequest } from '../interfaces/SlideInterface'
import { FileUploadRequest } from '../interfaces/SlideInterface'
import SlideHelpers from '../helpers/SlideHelpers'

const uploadSlide = async (
  req: FileUploadRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file
    const { id } = res.locals.user

    const secureLink = await SlideService.uploadSlide(file)

    const shortenLink = await SlideHelpers.shortenLink(secureLink)

    const validateShortLink = await validator({
      schema: shortenLinkSchema,
      data: { shortenLink }
    })

    if (!validateShortLink.isValid) {
      throw new GenericError(validateShortLink.error)
    }

    await SlideService.addSlideToUser(id, shortenLink)

    res.status(200).send({ message: 'success' })
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

export default { createSlide, deletePresentation, uploadSlide }
