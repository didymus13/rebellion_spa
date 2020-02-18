const mongoose = require('mongoose')
mongoose.connect(process.env.DB_DSN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})