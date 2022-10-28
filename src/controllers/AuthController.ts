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
    res.status(200).cookie('token', token).json({ message: 'success', user })
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(exception)
    res.status(400).json({ message: exception.message })
  }
}

const verifyToken = async (req: VerifyTokenRequest, res: Response) => {
  try {
    const { token } = req.cookies
    const user = await AuthService.verifyToken(token)

    res.status(200).send({ message: 'success', user })
  } catch (error) {
    res.status(401).send({ error: 'unauthorized' })
  }
}

export default { login, verifyToken }
