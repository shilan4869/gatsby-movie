/**
 * Hash arrays, objects and primitives, recursively.
 * @returns {string}
 */
const hash = value => {
  switch (typeof value) {
    case 'string':
      return value
    case 'undefined':
      return 'undefined'
    case 'boolean':
      return value ? 'true' : 'false'

    case 'object':
      if (!value) {
        return 'null'
      }

      if (value.map) {
        const array = []

        for (let i = 0; i < value.length; i++) {
          array.push(hash(value[ i ]))
        }

        return `[${ array.toString() }]`
      }

      {
        const entries = []

        for (const key in value) {
          entries.push([ key, hash(value[ key ]) ])
        }

        entries.sort(([ a ], [ b ]) => a > b ? 1 : a < b ? -1 : 0)

        for (let i = 0; i < entries.length; i++) {
          entries[ i ] = entries[ i ].join(':')
        }

        return `{${ entries.toString() }}`
      }

    default:
      return String(value)
  }
}

export default hash
