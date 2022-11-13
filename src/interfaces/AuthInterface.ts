import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
import { IncomingHttpHeaders } from 'http'

export interface LoginRequest extends Request {
  body: { email: string; password: string }
}

export interface Token {
  token: string | JwtPayload
}

export interface VerifyTokenRequest extends Request {
  headers: IncomingHttpHeaders & { 'x-access-token'?: string }
}
