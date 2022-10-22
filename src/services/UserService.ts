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
  if (userByEmail) throw new GenericError('email is in use')

  const hashedpassword = await AuthHelper.hashPassword(password)

  await createUser({
    name,
    email,
    password: hashedpassword,
    slides: []
  })
}

export default { createUser }
