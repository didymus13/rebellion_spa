exports.handler = (event, ctx, callback) => {
  return callback(null, {
    statusCode: 200,
    body: 'Foo Bar Baz'
  })
}
