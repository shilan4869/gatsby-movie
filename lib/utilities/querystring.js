/**
 * @param {{[k: string]: string}} query
 * @returns {string}
 */
const stringify = query => {
  const params = Object.entries(query)
    .sort(([ a ], [ b ]) => a > b ? 1 : a < b ? -1 : 0)
    .map(([ key, value ]) => `${ key }=${ encodeURIComponent(value) }`)
    .join('&')
    .replaceAll('%20', '+')

  return params && `?${ params }`
}

/**
 * @param {string} query
 * @returns {{[k: string]: string}}
 */
const parse = query => Object.fromEntries(new URLSearchParams(query))

module.exports = {
  stringify,
  parse,
}
