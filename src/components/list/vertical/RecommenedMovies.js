import React from 'react'
import { TMDB_TRENDING_MOVIE_API, TMDB_TRENDING_TV_API, API_KEY } from 'src/constants/apiConstants'
import { MOVIES_TAB } from 'src/components/layout/constant'
import useQuery from 'lib/hooks/useQuery'
import VerticalList from './VerticalList'
import useMenuTabContext from 'src/hooks/useMenuTabContext'

const RecommenedMovies = ({ className }) => {
  const { menuTab } = useMenuTabContext()
  const ApiEndpoint = menuTab === MOVIES_TAB ? TMDB_TRENDING_MOVIE_API : TMDB_TRENDING_TV_API
  const { loading, error, data: popularMoviesOrTVShows } = useQuery(ApiEndpoint, { query: { api_key: API_KEY } })

  if (loading || error) {
    return
  }

  return <VerticalList movies={ popularMoviesOrTVShows.results } heading='Recommend for you' className={ className } />
}

export default RecommenedMovies
