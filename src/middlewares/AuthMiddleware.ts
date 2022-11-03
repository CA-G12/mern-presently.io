import { Response, NextFunction } from 'express'
import AuthHelper from '../helpers/AuthHelper'
import { VerifyTokenRequest } from '../interfaces/AuthInterface'

const verifyAccessToken = async (
  req: VerifyTokenRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies
    const user = await AuthHelper.verifyToken(token)

    res.locals.user = user
    next()
  } catch (err) {
    res.status(401).json({ error: 'unauthenticated' })
  }
}

export { verifyAccessToken }
