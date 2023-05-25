const app = require('./app')
const dotEnv = require('dotenv')

dotEnv.config()

const PORT = process.env.PORT || 8000

const startServer = async () => {
  app.listen(PORT, () => console.log(`Listening on ${PORT}...`))
}

startServer()
