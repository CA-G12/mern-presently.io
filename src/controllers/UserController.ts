import { Response } from 'express'
import UserService from '../services/UserService'
import { signupvalidationschema } from '../validation/userValidation'
import { validate } from '../validation/validator'
import { UserRequest } from 'interfaces/UserInterface'
import GenericError from '../helpers/GenericError'

const createUser = async (req: UserRequest, res: Response) => {
  try {
    const { name, email, password } = req.body

    const validationResult = await validate({
      schema: signupvalidationschema,
      data: { name, email, password }
    })
    if (!validationResult.isValid)
      throw new GenericError(validationResult.error)

    await UserService.createUser({ name, email, password })
    res.status(201).json({ message: 'signup sucessfully' })
  } catch (error: unknown) {
    const exception = error as Error

    if (exception.name !== 'GenericError') throw exception
    return res.status(400).send({ error: exception.message })
  }
}

export default { createUser }
