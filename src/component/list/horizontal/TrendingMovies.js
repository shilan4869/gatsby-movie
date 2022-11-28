import React, { useMemo } from 'react'
import { TMDB_TRENDING_MOVIE_API, API_KEY } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import HorizontalList from './HorizontalList'

const TrendingMovies = () => {
  const { data } = useQuery(TMDB_TRENDING_MOVIE_API, { query: { api_key: API_KEY } })
  const shuffleArray = array => {
    if (!array) {
      return
    }

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [ array[ i ], array[ j ] ] = [ array[ j ], array[ i ] ]
    }

    return array
  }

  const trendingMovies = useMemo(() => shuffleArray(data?.results), [ data ])

  return <HorizontalList movies={ trendingMovies } heading='Hot Movies' />
}

export default TrendingMovies
