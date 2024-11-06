import { RequestHandler } from "express"

export const checkOwner: RequestHandler = (req, res, next) => {
  // @ts-ignore
  const jwtData = req["jwt"]
  if (jwtData.id != req.params.id)
    return res.status(401).json({ message: 'You are not the owner of this resource' })  
  next()
}