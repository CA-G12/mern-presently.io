import mongoose from 'mongoose'
import UserInterface from '../interfaces/UserInterface'
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
  slides: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      }
    }
  ]
})
const Uesr = mongoose.model('User', userSchema)
export default Uesr
