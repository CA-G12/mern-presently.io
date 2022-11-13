const tokenName = 'token'

const getToken = (): string | null => {
  return localStorage.getItem(tokenName)
}

const setToken = (token: string): void => {
  localStorage.setItem(tokenName, token)
}

const destroyToken = (): void => {
  localStorage.removeItem(tokenName)
}

export default { getToken, setToken, destroyToken }
