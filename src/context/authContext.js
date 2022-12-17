import React, { createContext, useState } from 'react'
import { isClient } from 'lib/utilities/is'
import useAuthenticationPopup from 'src/hooks/useAuthenticationPopup'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null)
  const { popup, logIn, signUp, preload, resetPassword } = useAuthenticationPopup()

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
  }

  return (
    <AuthContext.Provider value={ authData }>
      { children }
      { !user && popup }
    </AuthContext.Provider>
  )
}

export default AuthProvider
