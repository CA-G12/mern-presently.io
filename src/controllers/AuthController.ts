import { Request, Response } from 'express'
import { verifyToken } from '../helpers/AuthHelper'

const verifyTokenController = async (req: Request, res: Response) => {
  const { token } = req.body
  try {
    await verifyToken(token)
    res.status(200).send({ msg: 'authorized' })
  } catch (error) {
    res.status(401).send({ msg: 'unauthorized' })
  }
}

export { verifyTokenController }
