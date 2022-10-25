import { Request } from 'express'

export interface SlideInterface {
  id: string
  title: string
  link: string
  isPrivate: boolean
  isLive: boolean
}

export interface UpdateSlideRequest extends Request {
  body: Omit<SlideInterface, 'id'>
  params: { id: string }
}

export interface onSlideOperations extends SlideInterface {
  userId: string
}
export interface CreateSlideOptions {
  title: string
  link: string
  isLive?: boolean
  isPrivate?: boolean
}

export interface CreateSlideRequest extends Request {
  body: Omit<SlideInterface, 'id'>
}

export interface DeleteSlideRequest extends Request {
  params: { id: string }
}
