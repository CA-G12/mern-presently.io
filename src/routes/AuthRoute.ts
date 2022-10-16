import express from 'express'
import { verifyAccessToken } from '../helpers/AuthHelper'

const router = express.Router()
router.post('/token', verifyAccessToken, (req, res) => {
  res.send('hello')
})

export default router
