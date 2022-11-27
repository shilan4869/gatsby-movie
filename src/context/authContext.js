import React, { createContext, useState } from 'react'
import useQuery from 'lib/hooks/useQuery'
import { TMDB_MOVIE_GENRES_API, TMDB_TV_GENRES_API } from 'src/constants/apiConstants'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [ homepageTab, setHomepageTab ] = useState(JSON.parse(localStorage.getItem('menuTab')) || NaN)
  const genresApi = homepageTab === 1 ? TMDB_TV_GENRES_API : TMDB_MOVIE_GENRES_API
  const { loading, error, data } = useQuery(genresApi)

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
