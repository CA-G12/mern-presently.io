import { verify, sign, VerifyErrors } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import environment from '../config/environment'

const { secretKey } = environment.jwt

const checkPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword)
}

const verifyToken = (token: string): Promise<{ id: string }> =>
  new Promise((resolve, reject) => {
    verify(token, secretKey, (error: VerifyErrors | null, decoded: unknown) => {
      const decodedJWT = decoded as { id: string }

      if (error) {
        reject(error)
      } else {
        resolve(decodedJWT)
      }
    })
  })

const generateAccessToken = async (id: string): Promise<string> =>
  new Promise((resolve, reject) => {
    sign({ id }, secretKey, (error: Error | null, token: unknown) => {
      const jwtToken = token as string

      if (error) {
        reject(error)
      } else {
        resolve(jwtToken)
      }
    })
  })

const hashPassword = (password: string) => bcrypt.hash(password, 10)

export default { verifyToken, generateAccessToken, checkPassword, hashPassword }
