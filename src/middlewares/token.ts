import { RequestHandler } from "express"
import { refresh } from "../services/jwt"

export const refreshToken: RequestHandler = (req, res) => {
  if (!req.headers.authorization) 
      return res.status(401).send('No token provided')
  const newToken = refresh(req.headers.authorization)
  res.send({ token: newToken })
}

export default {
  refreshToken
}