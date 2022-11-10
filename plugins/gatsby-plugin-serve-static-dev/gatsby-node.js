const serveStatic = require('./serveStatic')

exports.onCreateDevServer = ({ app }, options) => {
  app.use(serveStatic(options))
}
