import express from 'express'
import SlideController from '../controllers/SlideController'

const router = express.Router()

router.post('/', SlideController.createSlide)
router.delete('/:id', SlideController.deletePresentation)

export default router
