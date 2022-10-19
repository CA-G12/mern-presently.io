import { Response } from 'express'
import { AddPresentationRequest } from '../interfaces/SlideInterface'
import SlideService from '../services/SlideService'

const createPresentation = async (
  req: AddPresentationRequest,
  res: Response
) => {
  try {
    const { link, title, isPrivate, isLive } = req.body
    const presentation = await SlideService.addPresentation({
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
