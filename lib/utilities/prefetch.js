import { isServer } from 'lib/utilities/is'
import { open } from './cache'
import request from './request'

export const prefetch = (
  url,
  query = null,
  { broadcast = false, revalidate = false } = {},
) => {
  const { read, modify } = open(url, query)
  const { promise, data, prefetch } = read()

  if (promise || prefetch || (data && !revalidate) || isServer) {
    return
  }

  modify({ prefetch: request(url, query) }, broadcast)
}

export const refresh = (url, query, { broadcast = false } = {}) => prefetch(
  url,
  query,
  { broadcast, revalidate: true },
)
