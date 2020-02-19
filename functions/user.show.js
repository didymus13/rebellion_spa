require('./db')
const User = require('./user.model')
const getId = require('./utils/getId')

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    const user = await User.findById(getId(event.path))
    return {
      statusCode: 200,
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
