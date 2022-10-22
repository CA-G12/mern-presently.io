import { Request } from 'express'

export interface SlideInterface {
  id: string
  title: string
  link: string
  isPrivate: boolean
  isLive: boolean
}

export interface UpdatePresentationRequest extends Request {
  body: SlideInterface
  params: { id: string }
}
