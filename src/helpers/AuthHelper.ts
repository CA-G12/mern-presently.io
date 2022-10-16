import { verify, sign, JwtPayload, VerifyErrors } from 'jsonwebtoken'

import env from '../config/environment'

const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    verify(
      token,
      env.jwt.secretKey,
      (
        error: VerifyErrors | null,
        decoded: string | JwtPayload | undefined
      ) => {
        if (!error) resolve(decoded)
        reject(error)
      }
    )
  })
}

const signToken = (payload: JwtPayload): Promise<any> => {
  return new Promise((resolve, reject) => {
    sign(
      payload,
      env.jwt.secretKey,
      (error: Error | null, token: string | undefined) => {
        if (!error) {
          resolve(token)
        }
        reject(error)
      }
    )
  })
}

const generateAccessToken = async (id: string): Promise<any> => {
  const payload = { id: id }
  try {
    return await signToken(payload)
  } catch (err) {
    throw new Error()
  }
}

export { verifyToken, generateAccessToken, signToken }
