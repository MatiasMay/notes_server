require('dotenv').config()

const PORT = process.env.PORT
//const MONGODB_URI = process.env.MONGODB_URI
MONGODB_URI = process.argv[2]

module.exports = {
  MONGODB_URI,
  PORT
}