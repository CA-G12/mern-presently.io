import { hashPassword } from '../helpers/HashPassword'
import { UserInterface } from 'interfaces/UserInterface'
import { createUser, getUser } from '../repositories/UserRepository'
import CustomError from '../helpers/ErrorClass'

export const establishUser = async ({
  name,
  email,
  password
}: UserInterface) => {
  const emailExist = await getUser({ email })

  if (emailExist) throw new CustomError('email is in use')

  const hashedpassword: string = await hashPassword(password)

  await createUser({
    name,
    email,
    password: hashedpassword
  })
}
