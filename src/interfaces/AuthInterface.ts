import { JwtPayload } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { UserResponseInterface } from './UserInterface'

export interface Token {
  token: string | JwtPayload
}

export interface verifyTokenRequest extends Request {
  body: { token: string }
}

export interface verifyTokenResponse extends Response {
  body: { message: string; user: UserResponseInterface | null }
  locals: Record<any, { id: string }>
}
