import mongoose from 'mongoose'
// import User from '../models/User'
//
mongoose.connect(process.env.DB_DSN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

exports.handler = (event, ctx) => {
  // const users = await User.find({})
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'It imports mongoose' })
  }
}
