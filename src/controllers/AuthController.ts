import { Response, NextFunction } from 'express'
import AuthService from '../services/AuthService'
import { VerifyTokenRequest, LoginRequest } from '../interfaces/AuthInterface'
import { validator } from '../validation/validator'
import { authSchema } from '../validation/authValidation'
import GenericError from '../helpers/GenericError'

const login = async (req: LoginRequest, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    const validate = await validator({
      schema: authSchema,
      data: { email, password }
    })
    if (!validate.isValid) {
      throw new GenericError(validate.error)
    }

    const { user, token } = await AuthService.login({
      email,
      password
    })
    res.status(200).json({ message: 'success', user, token })
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(exception)
    res.status(400).json({ message: exception.message })
  }
}

const verifyToken = async (req: VerifyTokenRequest, res: Response) => {
  try {
    if (!req.headers['x-access-token']) {
      throw new Error('unauthenticated')
    }
    const token = req.headers['x-access-token'].split(' ')[1]

    const user = await AuthService.verifyToken(token)

    res.status(200).send({ message: 'success', user })
  } catch (error) {
    res.status(401).send({ error: 'unauthenticated' })
  }
}

export default { login, verifyToken }
