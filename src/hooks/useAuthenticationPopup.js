import Popup from 'lib/components/Popup'
import loadable from 'lib/utilities/loadable'
import { useCallback, useState } from 'react'
import { FORGOT_PASS, LOG_IN, SIGN_UP } from 'src/constants/authentication'
// import { load } from 'src/utilities/captcha'

const Authentication = loadable(() => import(`src/components/Authentication/AuthenticationPopup`))

const useAuthenticationPopup = () => {
  const [ page, setPage ] = useState(null)

  const logIn = useCallback(
    event => {
      event?.preventDefault?.()
      setPage(LOG_IN)
    },
    [],
  )

  const signUp = useCallback(
    event => {
      event?.preventDefault?.()
      setPage(SIGN_UP)
    },
    [],
  )

  const resetPassword = useCallback(
    event => {
      event?.preventDefault?.()
      setPage(FORGOT_PASS)
    },
    [],
  )

  const handleClose = useCallback(() => setPage(null), [])

  const preload = useCallback(
    () => {
      Authentication.preload()
      // load()
    },
    [],
  )

  const popup = page !== null
    ? (
      <Popup style={ { width: '992px' } } onClose={ handleClose }>
        <Authentication page={ page } />
      </Popup>
    )
    : null

  return {
    popup,
    logIn,
    signUp,
    preload,
    resetPassword,
  }
}

export default useAuthenticationPopup
