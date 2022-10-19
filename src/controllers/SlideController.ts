import { Response } from 'express'
import { CreatePresentationRequest } from '../interfaces/SlideInterface'
import SlideService from '../services/SlideService'

const createPresentation = async (
  req: CreatePresentationRequest,
  res: Response
) => {
  try {
    const { link, title, isPrivate, isLive } = req.body
    const presentation = await SlideService.createPresentation({
      link,
      title,
      isPrivate,
      isLive
    })

    res.status(200).send({ message: 'success', presentation })
  } catch (error) {
    res.status(400).send({ error: 'bad request' })
  }
}

export default { createPresentation }
