import express from 'express'
import { updatePresentation } from '../controllers/PresentationController'

const router = express.Router()

router.put('/slides/:id', updatePresentation)

export default router
