import React, { createContext } from 'react'
import useQuery from 'lib/hooks/useQuery'
import useMenuTabContext from 'src/hooks/useMenuTabContext'
import { TMDB_MOVIE_GENRES_API, TMDB_TV_GENRES_API } from 'src/constants/apiConstants'
import { MOVIES_TAB, TV_TAB } from 'src/components/layout/constant'
import { isClient } from 'lib/utilities/is'

export const GenresContext = createContext()

const GenresProvider = ({ children }) => {
  const { menuTab } = useMenuTabContext()
  let genresApi

  switch (menuTab) {
    case TV_TAB:
      genresApi = TMDB_TV_GENRES_API
      break
    case MOVIES_TAB:
      genresApi = TMDB_MOVIE_GENRES_API
      break

    default:
      if (isClient) {
        genresApi = Number(localStorage.getItem('menuTab')) === TV_TAB ? TMDB_TV_GENRES_API : TMDB_MOVIE_GENRES_API
      } else {
        genresApi = TMDB_TV_GENRES_API
      }

      break
  }

  const { loading, error, data: genresData } = useQuery(genresApi)

  const genresArray = loading || error ? [] : genresData.genres
  const genres = new Map()

  // [{id: 1, name: 'a'}]
  genresArray.forEach(genre => genres.set(genre.id, genre.name))

  const data = {
    genres,
  }

  return (
    <GenresContext.Provider value={ data }>
      { children }
    </GenresContext.Provider>
  )
}

export default GenresProvider
