export interface SlideInterface {
  _id: string
  title: string
  link: string
  isPrivate: boolean
  isLive: boolean
}

export interface UpdateSlideInterface {
  id: string
  link?: string
  isLive?: boolean
  title?: string
  isPrivate?: boolean
}
