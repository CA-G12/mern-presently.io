import SlideInterface from './SlideInterface'

export default interface UserInterface {
  id: string
  name: string
  email: string
  password: string
  slides: SlideInterface[]
}
