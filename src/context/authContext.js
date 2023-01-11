import React, { createContext, useState, useEffect } from 'react'
import { isClient } from 'lib/utilities/is'
import useAuthenticationPopup from 'src/hooks/useAuthenticationPopup'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null)
  const { popup, logIn, signUp, preload, resetPassword, handleClose: closeAuthPopUp } = useAuthenticationPopup()

  const USER_INFO_API = 'http://localhost:1000/auth/get/user'

  const getUserInfo = async () => {
    if (user) {
      return
    }

    try {
      const response = await fetch(USER_INFO_API, {
        credentials: 'include',
      })
      const { data } = await response.json()

      if (data.success) {
        setUser(data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  if ((!user) && isClient) {
    preload()
  }

  const authData = {
    popup,
    logIn,
    signUp,
    preload,
    resetPassword,
    user,
    setUser,
    getUserInfo,
    closeAuthPopUp,
  }

  useEffect(() => {
    getUserInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={ authData }>
      { children }
      { !user && popup }
    </AuthContext.Provider>
  )
}

export default AuthProvider
