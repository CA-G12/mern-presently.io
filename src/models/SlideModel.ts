import mongoose from 'mongoose'
import { SlideInterface } from 'interfaces/SlideInterface'
const Schema = mongoose.Schema

const slideSchema = new Schema<SlideInterface>({
  title: {
    type: String,
    default: 'Untitled',
    required: true
  },
  link: {
    type: String,
    required: true
  },
  isPrivate: {
    type: Boolean,
    default: true,
    required: true
  },
  isLive: {
    type: Boolean,
    default: false,
    required: true
  }
})

const Slide = mongoose.model('Slide', slideSchema)
export default Slide
