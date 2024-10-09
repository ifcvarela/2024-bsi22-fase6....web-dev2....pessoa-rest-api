import jwt from 'jsonwebtoken'

const secret = 'my-secret-key'
const expiresIn = '1h'

export const sign = (payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) return reject(err)
      resolve(<string>token)
    })
  })
}

export const verify = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err)
      resolve(<string>decoded)
    })
  })
}

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