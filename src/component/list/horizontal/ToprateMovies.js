import React from 'react'
import { TMDB_TOPRATE_MOVIE_API } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import HorizontalList from './HorizontalList'

const ToprateMovies = () => {
  const { loading, error, data: toprateMovies } = useQuery(TMDB_TOPRATE_MOVIE_API)


  if (loading || error) {
    return
  }

  return <HorizontalList movies={ toprateMovies.results } />
}

export default ToprateMovies
