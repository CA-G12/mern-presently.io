import express from 'express'
import AuthRoute from './AuthRoute'

const router = express.Router()

router.use('/auth', AuthRoute)

export default router
