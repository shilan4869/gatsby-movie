import { useEffect, useMemo, useReducer } from 'react'
import { open } from 'lib/utilities/cache'
import hash from 'lib/utilities/hash'

/**
 * @param {string} url
 * @param {{[k: string]: string}} [query]
 */
const useCache = (url, query) => {
  const [ , rerender ] = useReducer(state => state + 1, 0)
  const key = useMemo(() => query ? url + hash(query) : url, [ url, query ])
  const [ cache, unsubscribe ] = useMemo(
    () => {
      const cache = open(key)

      // on mobile safari, response promises resolve before useEffect hooks run
      // which means that we must create subscriptions even earlier
      return [ cache, cache.subscribe(rerender) ]
    },
    [ key ],
  )

  useEffect(() => unsubscribe, [ unsubscribe ])

  return cache
}

export default useCache
