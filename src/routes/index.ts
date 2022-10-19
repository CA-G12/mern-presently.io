import express from 'express'
import AuthRoute from './AuthRoute'
import PresentationRoute from './PresentationRoute'

const router = express.Router()

router.use('/auth', AuthRoute)
router.use(PresentationRoute)

export default router
