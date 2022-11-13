const FormError = require('../errors/FormError')
const GenericError = require('../errors/GenericError')
const InterruptError = require('../errors/InterruptError')
const ClientError = require('../errors/ClientError')
const { stringify } = require('../utilities/querystring')

const errors = {
  FormError,
  GenericError,
  InterruptError,
}


/**
 * @param {string} url
 * @param {{[k: string]: string}} [query]
 * @param {{[k: string]: string}} [body]
 * @returns {Promise<object?>}
 * @throws {FormError}
 * @throws {GenericError}
 * @throws {InterruptError}
 * @throws {ClientError}
 * @throws {Error}
 */
const request = async (url, query = null, body = null) => {
  if (query) {
    url += stringify(query)
  }

  const form = body && body instanceof FormData

  const response = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: !body
      ? void 0
      : form
        ? { 'x-requested-with': 'fetch' }
        : { 'x-requested-with': 'fetch', 'content-type': 'application/json' },
    body: !body ? void 0 : form ? body : JSON.stringify(body),
    mode: body ? 'same-origin' : void 0,
    // credentials: "include",
  })

  body = await response.text()

  if (process.env.NODE_ENV === 'development') {
    if (body && !body.startsWith('{')) {
      console.error(process.env.GATSBY_API_ORIGIN + url, body)
    }
  }

  try {
    body = body ? JSON.parse(body) : null
  } catch {
    return
  }

  if (response.status !== 200) {
    const Error = errors[ body && body.type ] || ClientError

    throw new Error({ status: response.status, ...body })
  }

  return body
}

module.exports = request
