export interface LoginRequest {
  body: { email: string; password: string }
}

export interface Token {
  token: string
}

export interface VerifyTokenRequest {
  cookies: { token: string }
  body: { token: string }
}
