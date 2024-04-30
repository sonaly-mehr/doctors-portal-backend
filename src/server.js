import app from './app.js'
import config from './config/index.js'


let server;

async function bootstrap() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    console.error('Failed to connect database', err)
  }

}

bootstrap()