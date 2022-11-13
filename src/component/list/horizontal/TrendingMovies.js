import React from 'react'
import { TMDB_TRENDING_MOVIE_API } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import HorizontalList from './HorizontalList'

const TrendingMovies = () => {
  const { loading, error, data: trendingMovies } = useQuery(TMDB_TRENDING_MOVIE_API)


  if (loading || error) {
    return
  }

  return <HorizontalList movies={ trendingMovies.results } heading='Hot Movies' />
}

export default TrendingMovies
