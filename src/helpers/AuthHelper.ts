import { Request, Response, NextFunction } from 'express'
import jwt, { Secret, JwtPayload, VerifyCallback } from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import { UserInterface } from '../interfaces/UserInterface'

import env from '../config/environment'

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resovle, reject) => {
    const { token } = req.body
    if (!token) {
      throw new Error()
    }
    jwt.verify(
      token,
      env.jwt.secretKey,
      (error: jwt.VerifyErrors | null): void => {
        if (error) {
          reject(error)
        }
      }
    )
  })
}

export { verifyAccessToken }
