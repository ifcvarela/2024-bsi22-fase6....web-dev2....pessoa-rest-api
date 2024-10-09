import { connect } from "../database"
import { RequestHandler } from "express"
import jwt from "jsonwebtoken"
import { refresh, sign, verify } from "../services/jwt"
import bcrypt from "bcrypt"

export const createToken: RequestHandler = async (req, res) => {
  const db = await connect()
  const { email, password } = req.body

  const user = await db.get('SELECT id, email, password FROM users WHERE email = ? LIMIT 1', [email])

  if (!user)
    return res.status(401).json({ 'message': 'Invalid email' })
  
  const match = await bcrypt.compare(password, user.password)

  if (!match)
    return res.status(401).json({ 'message': 'Invalid password' })
  
  delete user.password
  const token = await sign(user)
  res.json({ token })
}

export const verifyToken: RequestHandler = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: 'No token provided' })

  const token = req.headers.authorization

  try {
    await verify(token)
    next()
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      return res.status(401).json({ message: 'Token expired' })

    if (err instanceof jwt.NotBeforeError)
      return res.status(401).json({ message: 'Token not active yet' })

    if (err instanceof jwt.JsonWebTokenError)
      return res.status(401).json({ message: 'Invalid token' })

    res.status(401).send('Invalid token [n]')
  }
}

export const refreshToken: RequestHandler = (req, res) => {
  console.warn('refreshToken: procurar maneira mais segura de fazer isso')
  if (!req.headers.authorization)
    return res.status(401).send('No token provided')
  const newToken = refresh(req.headers.authorization)
  res.send({ token: newToken })
}

export default {
  createToken,
  verifyToken,
  refreshToken
}