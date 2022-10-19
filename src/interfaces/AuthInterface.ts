import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'

export interface LoginRequest extends Request {
  body: { email: string; password: string }
}

export interface Token {
  token: string | JwtPayload
}

export interface VerifyTokenRequest extends Request {
  cookies: { token: string }
  body: { token: string }
}
