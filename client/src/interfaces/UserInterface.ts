import { SlideInterface } from './SlideInterface'

export interface UserInterface {
  id?: string
  name: string
  email: string
  password: string
  slides?: SlideInterface[]
}
export interface UserOptions {
  id?: number
  email?: string
  name?: string
}
export interface UserRequest {
  body: UserInterface
}