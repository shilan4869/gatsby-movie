import React from 'react'
import { TMDB_TOPRATE_TV_API, API_KEY } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import HorizontalList from './HorizontalList'

const ToprateTVShows = () => {
  const { loading, error, data: toprateTVShows } = useQuery(TMDB_TOPRATE_TV_API, { query: { api_key: API_KEY } })

  if (loading || error) {
    return
  }

  return <HorizontalList movies={ toprateTVShows.results } heading='Toprate TV Shows' />
}

export default ToprateTVShows
