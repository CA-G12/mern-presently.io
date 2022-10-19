import { Request } from 'express'

export interface SlideInterface {
  id: string
  title: string
  link: string
  isPrivate: boolean
  isLive: boolean
}

export interface CreatePresentationOptions {
  title: string
  link: string
  isLive?: boolean
  isPrivate?: boolean
}

export interface CreatePresentationRequest extends Request {
  body: Omit<SlideInterface, 'id'>
}
