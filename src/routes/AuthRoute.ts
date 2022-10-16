import express from 'express'
import { verifyTokenController } from '../controllers/AuthController'
import { generateAccessToken, verifyToken } from '../helpers/AuthHelper'

const router = express.Router()

router.post('/token', verifyTokenController)

export default router
