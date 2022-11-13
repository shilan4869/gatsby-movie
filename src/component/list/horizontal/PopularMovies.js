import React from 'react'
import { TMDB_POPULAR_MOVIE_API } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import HorizontalList from './HorizontalList'

const PopularMovies = () => {
  const { loading, error, data: popularMovies } = useQuery(TMDB_POPULAR_MOVIE_API)


  if (loading || error) {
    return
  }

  return <HorizontalList movies={ popularMovies.results } />
}

export default PopularMovies
