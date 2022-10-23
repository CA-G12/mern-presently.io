import AuthRoute from './AuthRoute'
import SlideRoute from './SlideRoute'
import UserRoute from './UserRoute'
import express from 'express'
import { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.use('/auth', AuthRoute)
router.use('/slides', SlideRoute)
router.use('/users', UserRoute)
router.use(
  (_error: Error, req: Request, res: Response, _next: NextFunction) => {
    res.status(500).send({ error: 'Internal Server Error' })
  }
)
export default router
