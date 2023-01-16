import { isClient } from 'lib/utilities/is'

const GoogleAuth = () => {
  if (!isClient) {
    return
  }

  const message = {
    sender: location.pathname,
    payload: Object.fromEntries(new URLSearchParams(window.location.search)),
  }

  opener.postMessage(message, location.origin)
  opener.focus()

  setTimeout(close)
}

export default GoogleAuth
