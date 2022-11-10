import { useCallback, useEffect, useRef, useState } from 'react'
import { isServer } from 'lib/utilities/is'
import request from 'lib/utilities/request'
import useCache from 'lib/hooks/useCache'

/**
 * @param {string} url
 * @param {{query: {[k: string]: string}, defer: boolean?}} options
 */
const useQueryInfinite = (url, { query, defer } = {}) => {
  const { read, modify, dispatch } = useCache(url, query)

  // dependent state
  // page count should reset to the initial value if url or query changes

  // another method is reset page count is to set a key
  //   whenever url or query changes
  // is to use a key for the component that uses this hook

  const initial = useCallback(() => {
    const { promise, error, data } = read([])

    // defaults to the size of cache pages
    //   or 1 if cache is empty
    return data.length + (promise || error ? 1 : 0) || 1
  }, [ read ])

  /**
   * @type {[number, React.Dispatch<number>]}
   */
  const [ state, setPage ] = useState(initial)
  const deps = useRef(read)

  useEffect(() => {
    if (deps.current !== read) {
      deps.current = read
      setPage(initial())
    }
  }, [ initial, read ])

  /**
   * @type {number}
   */
  const page = deps.current === read ? state : initial()

  // end dependent state

  const next = useCallback(() => {
    event.preventDefault()
    setPage(page => page + 1)
  }, [])

  // unset state.error and let query be fired naturally
  const retry = useCallback(() => modify({ error: null }), [ modify ])

  const prefetch = useCallback(() => {
    // because components do not care about prefetching statuses
    // we don't need to rerender them when prefetch() is invoked
    // however, because of that, this callback doesn't know the state of the
    //   current component
    // so we need to read the current state from cache store
    const { prefetch, data } = read()

    if (prefetch) {
      return
    }

    modify(
      { prefetch: request(url, { ...query, page: data.length + 1 }) },
      false,
    )
  }, [ url, query, read, modify ])

  const { error, data, promise: _promise, prefetch: _prefetch } = read()
  let promise

  if (_prefetch) {
    promise = _prefetch
  } else if (!(_promise || data[ page - 1 ] || error || defer || isServer)) {
    promise = request(url, page !== 1 ? { page, ...query } : query)
  }

  if (promise) {
    dispatch(promise.then(response => data.concat(response)))
  }

  const loading = !!(promise || _promise)

  return {
    page,
    loading: !!loading || isServer || (data.length === 0 && !error),
    error,
    data,
    next: loading || error ? null : next,
    prefetch: loading || error ? null : prefetch,
    retry: error ? retry : null,
  }
}

export default useQueryInfinite
