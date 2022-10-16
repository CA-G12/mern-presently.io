import { JwtPayload } from 'jsonwebtoken'

export interface Token {
  token: string | JwtPayload
}
