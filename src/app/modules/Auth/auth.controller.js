import { authServices } from './auth.services.js'

const loginUser = async (req, res, next) => {
  try {
    const { ...loginData } = req.body
    const result = await authServices.loginUser(loginData)
    res.send({
      statusCode: 200,
      success: true,
      message: 'User logged in successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (
  req,
  res,
  next,
) => {
  try {
    const token = req.headers.authorization
    const result = await authServices.refreshToken(token)
    res.send({
      statusCode: 200,
      success: true,
      message: 'Token refreshed successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const authControllers = { loginUser, refreshToken }
