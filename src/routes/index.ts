import express, { NextFunction, Request, Response } from 'express'
import AuthRoute from './AuthRoute'
import PresentationRoute from './PresentationRoute'

const router = express.Router()

router.use('/auth', AuthRoute)
router.use(PresentationRoute)

router.use(
  (_error: Error, req: Request, res: Response, _next: NextFunction) => {
    res.status(500).send({ error: 'Internal Server Error' })
  }
)

export default router
