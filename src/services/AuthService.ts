import AuthHelper from '../helpers/AuthHelper'
import UserRepository from '../repositories/UserRepository'
import { UserInterface } from '../interfaces/UserInterface'
import { Credentials } from '../interfaces/CredentialInterface'
import GenericError from '../helpers/GenericError'

const login = async ({ email, password }: Credentials) => {
  const user: UserInterface | null = await UserRepository.getUser({
    email
  })
  if (!user) {
    throw new GenericError('Please double check your email or password')
  }

  const isCorrectPassword = await AuthHelper.checkPassword(
    password,
    user.password
  )
  if (!isCorrectPassword) {
    throw new GenericError('Please double check your email or password')
  }

  const token = await AuthHelper.generateAccessToken(user.id)

  return { user, token }
}

const verifyToken = async (token: string) => {
  const { id } = await AuthHelper.verifyToken(token)
  const user = await UserRepository.getUser({ id })

  return user
}

export default { verifyToken, login }
