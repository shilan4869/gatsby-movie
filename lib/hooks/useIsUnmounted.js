import { useEffect, useRef } from 'react'

const useIsUnmounted = () => {
  const unmounted = useRef(false)

  useEffect(
    () => () => {
      unmounted.current = true
    },
    [],
  )

  return unmounted
}

export default useIsUnmounted
