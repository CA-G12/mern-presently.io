import express from 'express'
import SlideController from '../controllers/SlideController'

const router = express.Router()

router.put('/:id', SlideController.updatePresentation)

export default router
