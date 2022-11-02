import { Request } from 'express'

export interface LoginRequest extends Request {
  body: { email: string; password: string }
}

export interface Token {
  token: string
}

export interface VerifyTokenRequest extends Request {
  cookies: { token: string }
  body: { token: string }
}
