import { Request } from 'express'
import { SlideInterface } from './SlideInterface'

export interface UserInterface {
  id: string
  name: string
  email: string
  password: string
  slides?: SlideInterface[]
}

export interface UserRequest extends Request {
  body: Omit<UserInterface, 'id'>
}

export interface UserResponseInterface {
  id: string
  name: string
  email: string
  slides: SlideInterface[]
}

export interface GetUserOptions {
  id?: number
  email?: string
}
export interface SlideRequestInterface extends Request {
  params: {
    id: string
  }
}
