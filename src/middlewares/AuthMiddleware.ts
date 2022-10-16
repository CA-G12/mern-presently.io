import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../helpers/AuthHelper'

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body

  if (!token) {
    throw new Error()
  }

  try {
    verifyToken(token)
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Unauthorized' })
  }
}

export { verifyAccessToken }
