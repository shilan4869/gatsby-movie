import React, { createContext, useState } from 'react'
import useQuery from 'lib/hooks/useQuery'
import { TMDB_GENRES_API } from 'src/constants/apiConstants'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const { loading, error, data } = useQuery(TMDB_GENRES_API)
  const [ homepageTab, setHomepageTab ] = useState(NaN)

  if (loading || error) {
    return
  }

  const genresArray = data.genres
  const genres = new Map()

  genresArray.forEach(genre => genres.set(genre.id, genre.name))
  // [{id: 1, name: 'a'}]

  const authData = {
    genres,
    homepageTab,
    setHomepageTab,
  }

  return (
    <AuthContext.Provider value={ authData }>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
