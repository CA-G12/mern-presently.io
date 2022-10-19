import bcrypt from 'bcrypt'

export const hashPassword = (password: string) => bcrypt.hash(password, 10)
