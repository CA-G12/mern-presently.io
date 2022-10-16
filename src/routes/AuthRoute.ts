import express from 'express'
import { verifyTokenController } from '../controllers/AuthController'

const router = express.Router()

router.post('/token', verifyTokenController)

export default router
