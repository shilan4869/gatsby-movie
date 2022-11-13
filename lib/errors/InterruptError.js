const ClientError = require('./ClientError')

class InterruptError extends ClientError {
}

module.exports = InterruptError
