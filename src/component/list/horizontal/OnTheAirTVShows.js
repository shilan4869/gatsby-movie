import React from 'react'
import { TMDB_ON_THE_AIR_TV_API, API_KEY } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import HorizontalList from './HorizontalList'

const OnTheAirTVShows = () => {
  const { loading, error, data: onTheAirTVShows } = useQuery(TMDB_ON_THE_AIR_TV_API, { query: { api_key: API_KEY } })

  if (loading || error) {
    return
  }

  return <HorizontalList movies={ onTheAirTVShows.results } heading='On Air TV' />
}

export default OnTheAirTVShows
