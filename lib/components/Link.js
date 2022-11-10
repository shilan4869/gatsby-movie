import { parsePath } from "gatsby"
import { loadPage } from "lib/utilities/loadPage"

const isExternal = (path) => !path || path.substr(0, 1) !== "/"

/**
 * @param {React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {to: string, state: {shallow: boolean, [k: string]: any}, replace: boolean, onPrefetch: () => void}} props
 * @param {React.MutableRefObject<HTMLElement>} ref
 */
const Link = ({
  to,
  state,
  replace,
  onTouchStart,
  onMouseDown,
  onClick,
  onPrefetch,
  ...props
}) => {
  if (isExternal(to)) {
    return <a href={to} target="_blank" rel="noreferrer" {...props} />
  }

  const prefetch = () => {
    const { pathname } = parsePath(to)

    loadPage(pathname)

    onPrefetch?.()
  }

  const handleTouchStart = (event) => {
    prefetch()

    onTouchStart?.(event)
  }

  const handleMouseDown = (event) => {
    prefetch()

    onMouseDown?.(event)
  }

  const handleClick = (event) => {
    onClick?.(event)

    if (
      // let browser open link in new tab
      props.target ||
      // ignore right clicks
      event.button !== 0 ||
      // onClick prevented default
      event.defaultPrevented ||
      // ignore clicks with modifier keys...
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    event.preventDefault()

    const pathname = decodeURIComponent(window.location.pathname)
    const { search, hash } = window.location

    if (to === pathname + search + hash) {
      return
    }

    window.___navigate(to, { state, replace })
  }

  return (
    <a
      {...props}
      href={to}
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    />
  )
}

export default Link
