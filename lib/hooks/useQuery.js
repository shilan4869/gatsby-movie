import request from "lib/utilities/request"
import { isServer } from "lib/utilities/is"
import useCache from "lib/hooks/useCache"

/**
 * @param {string} url
 * @param {{query: {[k: string]: string}, defer: boolean?}} options
 */
const useQuery = (url, { query, defer } = {}) => {
  const { read, dispatch } = useCache(url, query)

  let state = read()
  const { error, data, prefetch } = state

  if (prefetch) {
    state = dispatch(prefetch)
  } else if (
    !(state.promise || data !== void 0 || error || defer || isServer)
  ) {
    state = dispatch(request(url, query))
  }

  return {
    loading: !!state.promise || isServer,
    error,
    data: error ? void 0 : data,
  }
}

export default useQuery
