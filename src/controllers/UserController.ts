import { establishUser } from '../services/UserService'
import { signupvalidationschema } from '../validation/userValidation'
import { validate } from '../validation/validator'
import { UserRequest } from 'interfaces/UserInterface'
import { Response } from 'express'

const createUser = async (req: UserRequest, res: Response) => {
  const { name, email, password } = req.body
  const result = await validate({
    schema: signupvalidationschema,
    data: { name, email, password }
  })

  if (!result.isValid) return { statusCode: 400, body: { error: result.error } }

  try {
    await establishUser({ name, email, password })
    res.status(201).json({ message: 'signup sucessfully' })
  } catch (error: unknown) {
    const exception = error as Error
    if (exception.name != 'handeld') throw error
    else return { statusCode: 400, body: { error: result.error } }
  }
}
export default createUser
