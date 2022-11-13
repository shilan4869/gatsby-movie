class ClientError extends Error {
  constructor({ message, status, payload }) {
    super(message || status)

    /**
     * @type {string}
     */
    this.name = this.constructor.name
    /**
     * @type {number}
     */
    this.status = status
    /**
     * @type {object}
     */
    this.payload = payload
  }
}

module.exports = ClientError
