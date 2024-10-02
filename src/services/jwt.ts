import jwt from 'jsonwebtoken'

const secret = 'my-secret-key'
const expiresIn = '1h'

export const sign = (payload: any) => jwt.sign(payload, secret, { expiresIn })
export const verify = (token: string) => jwt.verify(token, secret)
export const decode = (token: string) => jwt.decode(token)

export const refresh = (token: string) => {
  console.warn('refreshing token - check safer way to do this')
  const decoded = decode(token) as any
  return sign({ id: decoded.id })
}

export default { 
  sign, 
  verify, 
  decode, 
  refresh 
}