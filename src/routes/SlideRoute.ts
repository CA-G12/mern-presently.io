import express from 'express'
import { updatePresentation } from '../controllers/SlideController'

const router = express.Router()

router.put('/:id', updatePresentation)

export default router
