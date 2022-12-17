import { useCallback, useState } from 'react'
import request from 'lib/utilities/request'
import useIsUnmounted from 'lib/hooks/useIsUnmounted'

/**
 * @typedef {{url: string, onCompleted: (data: object) => void, onError: (error: Error) => void, onFulfilled: (data: object) => void, onRejected: (error: Error) => void}} MutationOptions
 */

/**
 * @param {string} url
 */
const useMutation = (_url, _body) => {
  const unmounted = useIsUnmounted()
  const [ data, setData ] = useState(null)

  const mutate = useCallback(
    /**
     * @param {{[k: string]: string}} [body]
     * @param {MutationOptions} [options]
     */
    (body, { url, onCompleted, onError, onFulfilled, onRejected } = {}) => {
      const response = request(url || _url, null, _body ? { ...body, ..._body } : body || {})

      const promise = response
        .catch(error => error)
        .then(result => {
          if (unmounted.current) {
            return
          }

          if (result instanceof Error) {
            onError?.(result)
          } else {
            onCompleted?.(result)
          }

          // this component might get unmounted inside the above handlers
          // so this condition need rechecking
          if (unmounted.current) {
            return
          }

          setData(current => {
            // another mutation has been dispatched
            if (promise !== current) {
              return current
            }

            return result
          })
        })

      setData(promise)

      if (onFulfilled || onRejected) {
        response.then(onFulfilled, onRejected || (() => null))
      }

      return response
    },
    [ _url, _body, unmounted ],
  )

  const loading = data instanceof Promise
  const error = data instanceof Error ? data : null

  return {
    loading,
    error,
    data: loading || error ? null : data,
    mutate,
  }
}

export default useMutation
