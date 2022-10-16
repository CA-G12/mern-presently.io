import { Request, Response, NextFunction } from 'express'
import AuthHelper from '../helpers/AuthHelper'

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body

  if (!token) {
    throw new Error()
  }

  try {
    const user = await AuthHelper.verifyToken(token)
    res.locals.id = user.id
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Unauthorized' })
  }
}

export { verifyAccessToken }
