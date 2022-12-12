import React from 'react'
import { TMDB_TRENDING_TV_API, API_KEY } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import HorizontalList from './HorizontalList'

const TrendingTVShows = () => {
  const { loading, error, data: trendingTVShows } = useQuery(TMDB_TRENDING_TV_API, { query: { api_key: API_KEY } })

  if (loading || error) {
    return
  }

  return <HorizontalList movies={ trendingTVShows.results } heading='Hot TV Shows' />
}

export default TrendingTVShows
