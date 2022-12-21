const app = require('./app')
const dotEnv = require('dotenv')
const connectDB = require('./utils/connectDB')

dotEnv.config()

const PORT = process.env.PORT || 8000
const MONGOURI = process.env.MONGO_URI

const startServer = async () => {
  await connectDB(MONGOURI)
  app.listen(PORT, () => console.log(`Listening on ${PORT}...`))
}

startServer()
