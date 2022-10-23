import { Request } from 'express'

export interface SlideInterface {
  id: string
  title: string
  link: string
  isPrivate: boolean
  isLive: boolean
}

export interface UpdateSlideRequest extends Request {
  body: SlideInterface
  params: { id: string }
}
