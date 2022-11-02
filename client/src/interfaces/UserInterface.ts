import { SlideInterface } from './test'

export interface UserInterface {
  id: string
  name: string
  email: string
  password: string
  slides?: SlideInterface[]
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
