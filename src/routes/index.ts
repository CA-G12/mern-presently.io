import express from 'express'
import AuthRoute from './AuthRoute'
import SlideRoute from './SlideRoute'

const router = express.Router()

router.use('/auth', AuthRoute)
router.use('/slides', SlideRoute)

export default router
