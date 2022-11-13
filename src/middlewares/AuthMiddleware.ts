import { Response, NextFunction } from 'express'
import AuthHelper from '../helpers/AuthHelper'
import { VerifyTokenRequest } from '../interfaces/AuthInterface'

const verifyAccessToken = async (
  req: VerifyTokenRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers['x-access-token']) {
      throw new Error('unauthenticated')
    }
    const token = req.headers['x-access-token'].split(' ')[1]

    const user = await AuthHelper.verifyToken(token)

    res.locals.user = user
    next()
  } catch (err) {
    res.status(401).json({ error: 'unauthenticated' })
  }
}

export { verifyAccessToken }
