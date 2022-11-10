import { isClient } from 'lib/utilities/is'

const isSupported = isClient && typeof window.matchMedia !== 'undefined'

if (isSupported) {
  // safari 13 polyfill

  /**
   * @type {MediaQueryList}
   */
  const prototype = Object.getPrototypeOf(window.matchMedia('(min-width: 0px)'))

  if (!prototype.addEventListener) {
    prototype.addEventListener = function (type, listener) {
      this.addListener(listener)
    }

    prototype.removeEventListener = function (type, listener) {
      this.removeListener(listener)
    }
  }
}

const queries = {
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  mouse: '(hover: hover)',
}

/**
 * @param {('sm'|'md'|'lg'|'xl'|'mouse')} query
 * @returns
 */
const matchMedia = query => window.matchMedia(queries[ query ] || query)

export default isSupported ? matchMedia : null
