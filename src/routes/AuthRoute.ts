import express from 'express'
import AuthController from '../controllers/AuthController'

const router = express.Router()

router.post('/authenticate', AuthController.login)
router.post('/token', AuthController.verifyToken)

export default router
