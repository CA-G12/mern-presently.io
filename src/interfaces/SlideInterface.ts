import { Request } from 'express'

export interface SlideInterface {
  id: string
  title: string
  link: string
  isPrivate: boolean
  isLive: boolean
}

export interface AddPresentationOptions {
  title: string
  link: string
  isLive?: boolean
  isPrivate?: boolean
}

export interface AddPresentationRequest extends Request {
  body: { title: string; link: string; isPrivate?: boolean; isLive?: boolean }
}
