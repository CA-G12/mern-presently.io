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

export interface CreateSlideOptions {
  title?: string
  link: string
  isLive?: boolean
  isPrivate?: boolean
}

export interface DeleteSlideRequest extends Request {
  params: { id: string }
}

export interface FileInterface {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export interface CreateSlideRequest extends Request {
  File?: Express.Multer.File | FileInterface
  body: {
    title: string
    link: string
    isPrivate: boolean
    isLive: boolean
    token: string
  }
}

export interface DeleteSlideRequest extends Request {
  params: { id: string }
}
