import React, { createContext, useState } from 'react'
import useQuery from 'lib/hooks/useQuery'
import { isClient } from 'lib/utilities/is'
import { TMDB_MOVIE_GENRES_API, TMDB_TV_GENRES_API } from 'src/constants/apiConstants'
import { TV_TAB } from 'src/components/layout/constant'
import useAuthenticationPopup from 'src/hooks/useAuthenticationPopup'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const localTab = isClient ? JSON.parse(localStorage.getItem('menuTab')) || TV_TAB : TV_TAB


  const [ homepageTab, setHomepageTab ] = useState(localTab)
  const [ userId, setUserId ] = useState(NaN)
  const { popup, logIn, signUp, preload, resetPassword } = useAuthenticationPopup()

  const genresApi = homepageTab === 1 ? TMDB_TV_GENRES_API : TMDB_MOVIE_GENRES_API
  const { loading, error, data } = useQuery(genresApi)

  const genresArray = loading || error ? [] : data.genres
  const genres = new Map()

  // [{id: 1, name: 'a'}]
  genresArray.forEach(genre => genres.set(genre.id, genre.name))

  if (isNaN(userId)) {
    preload()
  }

  const authData = {
    genres,
    homepageTab,
    setHomepageTab,
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
