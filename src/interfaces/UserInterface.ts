import { SlideInterface } from './SlideInterface'

export interface UserInterface {
  id: string
  name: string
  email: string
  password: string
  slides: SlideInterface[]
}
