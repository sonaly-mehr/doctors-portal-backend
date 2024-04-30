
import httpStatus from 'http-status'

import { Prisma } from '@prisma/client'
import config from '../../config/index.js'
import { configDotenv } from 'dotenv'

export const globalErrorHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = httpStatus.BAD_REQUEST
  let message =
    config.env === 'development' ? err.message : 'something went wrong'

  if (config.env === 'development') {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      statusCode = 400
      const lines = err.message.trim().split('\n')
      // console.log(lines[lines.length - 1])
      message = lines[lines.length - 1]
      // console.log(message)
    } else if (err instanceof Prisma.PrismaClientValidationError) {
      statusCode = 400
      // message = err.message
      const lines = err.message.trim().split('\n')
      // console.log(lines[lines.length - 1])
      message = lines[lines.length - 1]
    } else if (err instanceof Error) {
      statusCode = httpStatus.BAD_REQUEST
      message = err.message
    }
  }

  res.status(statusCode).json({
    errorName: err.name,
    success: false,
    message: message,
    // errorStack: err.stack,
  })
}