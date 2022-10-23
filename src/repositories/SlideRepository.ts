import Slide from '../models/SlideModel'
const deleteSlide = (id: string) => Slide.findByIdAndDelete(id)
const findSlide = (id: string) => Slide.findById(id)
const createSlide = (slide: CreateSlideOptions) => Slide.create({ ...slide })

export default { deleteSlide, findSlide, createSlide }
