import { NextFunction, Response } from 'express'

import SlideService from '../services/SlideService'
import GenericError from '../helpers/GenericError'
import SlideHelpers from '../helpers/SlideHelpers'
import { validator } from '../validation/validator'
import { slideSchema } from '../validation/slideValidation'
import {
  CreateSlideRequest,
  GetSlideRequest,
  DeleteSlideRequest,
  UpdateSlideRequest
} from '../interfaces/SlideInterface'

const getSlide = async (
  req: GetSlideRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params

  try {
    const slide = await SlideService.getSlide(id)
    if (!slide) {
      throw new GenericError('Slide not found')
    }

    const htmlContent = await SlideService.getSlideHtmlContent(slide[0].link)
    if (!htmlContent) {
      throw new GenericError('No content')
    }

    const baseURL = 'https://presentlyio.netlify.app'

    const shortenLink = await SlideHelpers.shortenLink(
      `${baseURL}/presentations/${id}`
    )

    res.status(200).json({
      message: 'success',
      slide: { info: slide[0], shortenLink, htmlContent }
    })
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(exception)
    res.status(400).json({ message: exception.message })
  }
}

const updateSlide = async (
  req: UpdateSlideRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, link, isPrivate, isLive } = req.body
  const { slideId } = req.params
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
    const { id: userId } = res.locals.user
    const { title, isPrivate, isLive } = req.body
    const file = req.file

    if (!file) {
      throw new GenericError('Please Provide a File')
    }

    if (file.originalname.split('.')[1] !== 'md') {
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
      userId,
      link: linkSegment,
      title: file.originalname.split('.')[0],
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

const deleteSlide = async (
  req: DeleteSlideRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params

    const result = await SlideService.deleteSlide(id)
    if (!result.matchedCount) {
      throw new GenericError('Slide not found')
    }

    res.sendStatus(204)
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(exception)
    res.status(400).json({ message: exception.message })
  }
}

export default {
  createSlide,
  deleteSlide,
  updateSlide,
  getSlide
}
