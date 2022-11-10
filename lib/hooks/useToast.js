import { useCallback, useEffect, useState } from 'react'

/**
 * @param {number} duration
 */
const useToast = (duration, onDismiss) => {
  const [ paused, setPaused ] = useState(false)

  useEffect(
    () => {
      if (!duration || paused) {
        return
      }

      const timer = setTimeout(onDismiss, duration)

      return () => clearTimeout(timer)
    },
    [ paused, duration, onDismiss ],
  )

  const pause = useCallback(() => setPaused(true), [])
  const resume = useCallback(() => setPaused(false), [])

  return {
    pause,
    resume,
  }
}

export default useToast
