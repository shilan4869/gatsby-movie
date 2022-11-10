import { useState } from 'react'
import useLayoutEffect from 'lib/hooks/useLayoutEffect'
import { isServer } from 'lib/utilities/is'

/**
 * @type {Map<HTMLElement, function>}
 */
const listeners = new Map()

const isSupported = typeof IntersectionObserver !== 'undefined'

const observer = isSupported && new IntersectionObserver(
  (entries, observer) => {
    for (let i = 0; i < entries.length; i++) {
      if (entries[ i ].isIntersecting) {
        const { target } = entries[ i ]
        const listener = listeners.get(target)

        observer.unobserve(target)
        listeners.delete(target)

        listener()
      }
    }
  },
  { rootMargin: '700px' },
)

/**
 * @param {HTMLElement} target
 * @param {function} listener
 */
const observe = (target, listener) => {
  observer.observe(target)
  listeners.set(target, listener)

  return () => {
    observer.unobserve(target)
    listeners.delete(target)
  }
}

/**
 * @param {React.MutableRefObject<HTMLElement>} ref
 */
const useLazyLoad = ref => {
  const [ defer, setDefer ] = useState(true)

  useLayoutEffect(
    () => {
      if (!ref || !defer) {
        return
      }

      if (!ref.current) {
        return void setDefer(false)
      }

      return observe(ref.current, () => setDefer(false))
    },
    [ defer, ref ],
  )

  return defer
}

// no defer
const _useLazyLoad = () => isServer

export default isSupported ? useLazyLoad : _useLazyLoad
