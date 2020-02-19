const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_DSN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

const db = mongoose.connection
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
module.exports = db
