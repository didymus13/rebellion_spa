import User from '../models/User'
require('../config/db')

export async function handler(event, context, callback) {
  try {
    const users = await User.find({})
    return callback(null, {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users)
    })
  } catch (err) {
    return callback(null, {
      statusCode: 500,
      body: err
    })
  }
}
