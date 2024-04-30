import cors from 'cors'
import express from 'express'
import httpStatus from 'http-status'

import routes from './app/routes/index.js'

import cookieParser from 'cookie-parser'
import { globalErrorHandler } from './app/middleware/globalErrorHandler.js'

const app = express()

const corsOptions = {
  origin: true,
  credentials: true,
}
app.use('*', cors(corsOptions))
app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('/', async (req, res, next) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome HTTP SERVER',
  })
})

app.get("/error", (req, res, next) => {
  throw new Error("Demo Error")
})

app.use(globalErrorHandler)

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessage: {
      path: req.originalUrl,
      message: "Not Found"
    }
  })
})

export default app
