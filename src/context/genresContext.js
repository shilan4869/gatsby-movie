import React, { createContext } from 'react'
import useQuery from 'lib/hooks/useQuery'
import useMenuTabContext from 'src/hooks/useMenuTabContext'
import { TMDB_MOVIE_GENRES_API, TMDB_TV_GENRES_API } from 'src/constants/apiConstants'

export const GenresContext = createContext()

const GenresProvider = ({ children }) => {
  const { menuTab } = useMenuTabContext()
  const genresApi = menuTab === 1 ? TMDB_TV_GENRES_API : TMDB_MOVIE_GENRES_API
  const { loading, error, data } = useQuery(genresApi)

  const genresArray = loading || error ? [] : data.genres
  const genres = new Map()

  // [{id: 1, name: 'a'}]
  genresArray.forEach(genre => genres.set(genre.id, genre.name))


  const authData = {
    genres,
  }

  return (
    <GenresContext.Provider value={ authData }>
      { children }
    </GenresContext.Provider>
  )
}

export default GenresProvider
