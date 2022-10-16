import { UserInterface } from 'interfaces/UserInterface'
import mongoose from 'mongoose'
import slide from './SlideModel'

const Schema = mongoose.Schema
const userSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  slides: [slide.schema]
})
const User = mongoose.model('User', userSchema)
export default User
