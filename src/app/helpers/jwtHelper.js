import jwt from 'jsonwebtoken'
const createToken = (
  payload,
  secret,
  expireTime,
) => {
  return jwt.sign(payload, secret, { expiresIn: expireTime })
}

const decodeToken = (token) => {
  return jwt.decode(token)
}

export const jwtHelpers = { createToken, decodeToken }
