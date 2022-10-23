import Slide from '../models/SlideModel'
const deleteSlide = (id: string) => Slide.findByIdAndDelete(id)
export default { deleteSlide }
