import React, { createContext, useState } from 'react'
import useQuery from 'lib/hooks/useQuery'
import { TMDB_MOVIE_GENRES_API, TMDB_TV_GENRES_API } from 'src/constants/apiConstants'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  let localTab = NaN

  if (typeof window !== 'undefined') {
    localTab = JSON.parse(localStorage.getItem('menuTab'))
  }

  const [ homepageTab, setHomepageTab ] = useState(localTab || NaN)
  const genresApi = homepageTab === 1 ? TMDB_TV_GENRES_API : TMDB_MOVIE_GENRES_API
  const { loading, error, data } = useQuery(genresApi)

  if (loading || error) {
    return
  }

  const genresArray = data.genres
  const genres = new Map()

  // [{id: 1, name: 'a'}]
  genresArray.forEach(genre => genres.set(genre.id, genre.name))

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
