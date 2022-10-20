import express from 'express'
import { updatePresentation } from '../controllers/SlideController'

const router = express.Router()

router.put('/slides/:id', updatePresentation)

export default router
