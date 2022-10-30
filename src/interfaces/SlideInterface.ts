import { Request } from 'express'

export interface SlideInterface {
  id: string
  title: string
  link: string
  isPrivate: boolean
  isLive: boolean
}

export interface OperationOnSlideRequest extends Request {
  body: Omit<SlideInterface, 'id'>
  params: { id: string }
}

export interface CreateSlideOptions {
  title: string
  link: string
  isLive?: boolean
  isPrivate?: boolean
}

export type CreateSlideRequest = Omit<OperationOnSlideRequest, 'params'>

export type DeleteSlideRequest = Omit<OperationOnSlideRequest, 'body'>

export type UpdateSlideRequest = OperationOnSlideRequest

export type GetSlideRequest = Omit<OperationOnSlideRequest, 'body'>
