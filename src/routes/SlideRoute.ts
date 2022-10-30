import express from 'express'
import SlideController from '../controllers/SlideController'
import { verifyAccessToken } from '../middlewares/AuthMiddleware'

const router = express.Router()

router.put('/:id', verifyAccessToken, SlideController.updateSlide)
router.post('/', verifyAccessToken, SlideController.createSlide)
router.delete('/:id', verifyAccessToken, SlideController.deletePresentation)

export default router
