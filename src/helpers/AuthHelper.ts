import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import env from '../config/environment'

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('gere')
  const { token } = req.body

  if (!token) {
    throw new Error()
  }

  try {
    const decoded = verify(token, env.jwt.secretKey)
    throw new Error()
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Unauthorized' })
  }
}

export { verifyAccessToken }
