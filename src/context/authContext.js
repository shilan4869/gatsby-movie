import React, { createContext, useState } from 'react'
import { isClient } from 'lib/utilities/is'
import useAuthenticationPopup from 'src/hooks/useAuthenticationPopup'
import { set } from 'date-fns'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const USER_INFO_API = 'https://api.movie.tienlm.tech/auth/get/user'
  const [ user, setUser ] = useState(null)
  const { popup, logIn, signUp, preload, resetPassword } = useAuthenticationPopup()
  const getUserInfo = async () => {
    if (user) {
      return
    }

    const response = await fetch(USER_INFO_API)
    const data = await response.json()

    if (data.success) {
      console.log(data)
      setUser(data)
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
  }

  return (
    <AuthContext.Provider value={ authData }>
      { children }
      { !user && popup }
    </AuthContext.Provider>
  )
}

export default AuthProvider
