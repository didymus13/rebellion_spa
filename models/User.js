import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: { type: String }
  },
  { timestamps: true }
)

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
})

module.exports = mongoose.model('User', UserSchema)
