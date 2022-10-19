import AuthHelper from '../helpers/AuthHelper'
import * as UserRepository from '../repositories/UserRepository'

const verifyToken = async (token: string) => {
  const { id } = await AuthHelper.verifyToken(token)
  const user = await UserRepository.getUser({ id })

  return user
}

export default { verifyToken }
