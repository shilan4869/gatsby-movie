import React from 'react'
import { TMDB_POPULAR_MOVIE_API } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import VerticalList from './VerticalList'

const RecommenedMovies = ({ className }) => {
  const { loading, error, data: popularMovies } = useQuery(TMDB_POPULAR_MOVIE_API)

  if (loading || error) {
    return
  }

  return <VerticalList movies={ popularMovies.results } heading='Recommend for you' className={ className } />
}

export default RecommenedMovies
