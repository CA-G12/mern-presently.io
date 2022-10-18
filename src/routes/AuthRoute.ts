import express from 'express'
import AuthController from '../controllers/AuthController'

const router = express.Router()

router.post('/authenticate', AuthController.login)
router.post('/token', AuthController.verifyToken)
router.get('/logout', (req, res) => {
  res.clearCookie('token').status(200).json({
    message: 'success'
  })
})

export default router
