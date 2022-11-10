import EventEmitter from 'lib/utilities/EventEmitter'
import hash from 'lib/utilities/hash'

/**
 * @typedef {{promise:Promise?, error: Error?, data: (object|array|null)}} CacheEntry
 *
 * @type {Map<string, CacheEntry>}
 */
const cache = new Map()

const emitter = new EventEmitter()

/**
 * @param {string} url
 * @param {{[k: string]: string}} [query]
 * @returns
 */
export const tokenize = (url, query) => query ? url + hash(query) : url

/**
 * @param {string} url
 * @param {{[k: string]: string}} [query]
 */
export const open = (url, query) => {
  /**
   * @type {string}
   */
  const key = tokenize(url, query)

  const read = initial => {
    let state = cache.get(key)

    if (!state) {
      state = {
        data: initial,
        promise: null,
        error: null,
      }

      cache.set(key, state)
    } else if (state.data === void 0) {
      // it's ok to mutate state object here as this should only happens
      //   when initializing of the state
      state.data = initial
    }

    return state
  }

  /**
   * @param {CacheEntry} state
   * @param {boolean} [broadcast]
   * @returns {CacheEntry}
   */
  const modify = (state, broadcast = true) => {
    state = { ...cache.get(key), ...state }

    cache.set(key, state)

    if (broadcast) {
      emitter.emit(key)
    }

    return state
  }

  /**
   * @param {Promise} promise
   * @param {boolean} [broadcast]
   */
  const dispatch = (promise, broadcast = false) => {
    promise = promise
      .catch(error => error)
      .then(data => {
        if (promise !== cache.get(key).promise) {
          return
        }

        const state = data instanceof Error
          ? { promise: null, error: data }
          : { promise: null, error: null, data }

        modify(state)
      })

    // by default, results get broadcasted but queries are not
    return modify({ error: null, prefetch: null, promise }, broadcast)
  }

  /**
   * @param {function} listener
   */
  const subscribe = listener => {
    emitter.on(key, listener)

    return () => emitter.off(key, listener)
  }

  return {
    read,
    modify,
    dispatch,
    subscribe,
  }
}

export const read = key => cache.get(key)

/**
 * @param {string} key
 * @param {(object|function)} data
 */
export const put = (key, data, broadcast = true) => {
  const state = cache.get(key)

  if (typeof data === 'function') {
    if (!state?.data) {
      return
    }

    data = data(state.data)
  }

  if (data === state) {
    return
  }

  cache.set(key, { ...state, promise: null, error: null, data })

  if (broadcast) {
    emitter.emit(key)
  }
}

/**
 * @param {function} predicate
 */
export const scan = predicate => {
  if (typeof predicate === 'string') {
    const string = predicate

    predicate = key => key.startsWith(string)
  }

  return [ ...cache.keys() ].filter(predicate)
}

/**
 * @param {[string]} keys
 * @param {boolean} broadcast
 */
export const evict = (keys, broadcast = true) => {
  keys.forEach(key => cache.delete(key))

  if (broadcast) {
    keys.forEach(key => emitter.emit(key))
  }
}

if (process.env.NODE_ENV === 'development') {
  console.log('cache', cache, emitter)
}
