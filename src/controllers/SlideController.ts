import { NextFunction, Response } from 'express'

import { CreateSlideRequest } from '../interfaces/SlideInterface'
import SlideService from '../services/SlideService'
import { slideSchema } from '../validation/slideValidation'
import { validator } from '../validation/validator'
import GenericError from '../helpers/GenericError'
import { DeleteSlideRequest } from '../interfaces/SlideInterface'
import SlideHelpers from '../helpers/SlideHelpers'

const createSlide = async (
  req: CreateSlideRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, isPrivate, isLive } = req.body
    const file = req.file

    if (!file) {
      throw new GenericError('Please Provide a File')
    }

    if (file.mimetype !== 'text/markdown') {
      throw new GenericError('Please Provide a Valid File Type')
    }

    const cloudinaryLink = await SlideService.uploadSlide(file)

    const link = await SlideHelpers.shortenLink(cloudinaryLink)

    const validate = await validator({
      schema: slideSchema,
      data: { link, title, isPrivate, isLive }
    })

    if (!validate.isValid) {
      throw new GenericError(validate.error)
    }

    const linkSegment = link.split('/')[1]

    const slide = await SlideService.createSlide({
      link: linkSegment,
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

export default { createSlide, deletePresentation }
