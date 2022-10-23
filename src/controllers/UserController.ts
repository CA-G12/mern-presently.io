import { NextFunction, Response } from 'express'
import UserService from '../services/UserService'
import { signupValidationSchema } from '../validation/userValidation'
import { validator } from '../validation/validator'
import { UserRequest } from '../interfaces/UserInterface'
import GenericError from '../helpers/GenericError'

const createUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body

    const validationResult = await validator({
      schema: signupValidationSchema,
      data: { name, email, password }
    })
    if (!validationResult.isValid)
      throw new GenericError(validationResult.error)

    await UserService.createUser({ name, email, password })
    res.status(201).json({ message: 'success' })
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') return next(exception)
    return res.status(400).send({ error: exception.message })
  }
}

export default { createUser }
