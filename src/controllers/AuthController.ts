import AuthHelper from '../helpers/AuthHelper'
import { Response } from 'express'
import { verifyTokenRequest } from '../interfaces/AuthInterface'

const verifyToken = async (req: verifyTokenRequest, res: Response) => {
  const { token } = req.body
  try {
    const user = await AuthHelper.verifyToken(token)
    res.status(200).send({ message: 'success', user: user })
  } catch (error) {
    res.status(401).send({ message: 'unauthorized' })
  }
}

export default { verifyToken }
