import mongoose from 'mongoose'

export default interface UserInterface {
  id: string
  name: string
  email: string
  password: string
  slides: [{ _id: mongoose.Types.ObjectId; title: string; link: string }]
}
