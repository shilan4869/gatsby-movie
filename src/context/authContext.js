import React, { createContext, useState } from 'react'
import { isClient } from 'lib/utilities/is'
import useAuthenticationPopup from 'src/hooks/useAuthenticationPopup'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [ userId, setUserId ] = useState(NaN)
  const { popup, logIn, signUp, preload, resetPassword } = useAuthenticationPopup()

  if (isNaN(userId) && isClient) {
    preload()
  }

  const authData = {
    popup,
    logIn,
    signUp,
    preload,
    resetPassword,
    userId,
    setUserId,
  }

  return (
    <AuthContext.Provider value={ authData }>
      { children }
      { popup }
    </AuthContext.Provider>
  )
}

export default AuthProvider
