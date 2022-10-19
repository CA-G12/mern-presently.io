import { Response } from 'express'
import AuthService from '../services/AuthService'
import { VerifyTokenRequest } from '../interfaces/AuthInterface'

const verifyToken = async (req: VerifyTokenRequest, res: Response) => {
  try {
    const { token } = req.cookies
    const user = await AuthService.verifyToken(token)

    res.status(200).send({ message: 'success', user })
  } catch (error) {
    res.status(401).send({ error: 'unauthorized' })
  }
}

export default { verifyToken }
