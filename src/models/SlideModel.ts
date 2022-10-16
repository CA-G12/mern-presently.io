import mongoose from 'mongoose'
import SlideInterface from 'interfaces/SlideInterface'

const Schema = mongoose.Schema
const slideSchema = new Schema<SlideInterface>({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})
const Slide = mongoose.model('Slide', slideSchema)
export default Slide
