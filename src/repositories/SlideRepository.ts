import Slide from '../models/SlideModel'
const deleteSlide = (id: string) => Slide.findByIdAndDelete(id)
const findSlide = (id: string) => Slide.findById(id)
export default { deleteSlide, findSlide }
