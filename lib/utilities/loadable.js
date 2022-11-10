import { lazy, Suspense } from 'react'
import { isClient } from 'lib/utilities/is'

/**
 * @param {() => Promise<{default: React.ComponentType<any>}>} factory
 */
const loadable = factory => {
  const Lazy = lazy(factory)
  /**
   * @param {React.PropsWithChildren<P>} props
   */
  const Loadable = isClient
    ? props => (
      <Suspense fallback={ null }>
        <Lazy { ...props } />
      </Suspense>
    )
    : () => null

  Loadable.preload = factory

  return Loadable
}

export default loadable
