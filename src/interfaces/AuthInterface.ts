import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'

export interface Token {
  token: string | JwtPayload
}

export interface verifyTokenRequest extends Request {
  body: { token: string }
}
