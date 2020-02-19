require('./db')
const User = require('./user.model')

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    const users = await User.find({})
    return {
      statusCode: 200,
      body: JSON.stringify(users),
      // // more keys you can return:
      headers: { 'Content-Type': 'application/json' }
      // isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
