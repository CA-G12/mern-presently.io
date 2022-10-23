import AuthHelper from '../helpers/AuthHelper'
import { UserInterface } from '../interfaces/UserInterface'
import UserRepository from '../repositories/UserRepository'
import GenericError from '../helpers/GenericError'

const createUser = async ({
  name,
  email,
  password
}: Omit<UserInterface, 'id'>) => {
  const userByEmail = await UserRepository.getUser({ email })
  if (userByEmail) throw new GenericError('email is already in use')

  const hashedPassword = await AuthHelper.hashPassword(password)

  await createUser({
    name,
    email,
    password: hashedPassword,
    slides: []
  })
}

export default { createUser }
