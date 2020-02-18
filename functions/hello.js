exports.handler = (event, ctx, callback) => {
  const content = {
    message: 'Foo Bar Baz'
  }
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(content)
  })
}
