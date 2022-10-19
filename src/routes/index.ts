import express from 'express'
import AuthRoute from './AuthRoute'
import UserRoute from './UserRoute'

const router = express.Router()

router.use('/auth', AuthRoute)
router.use('/users', UserRoute)

export default router
