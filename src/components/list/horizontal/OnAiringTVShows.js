import React from 'react'
import { TMDB_ON_AIRING_TV_API } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import HorizontalList from './HorizontalList'

const OnAiringTVShows = () => {
  const { loading, error, data: onAiringTVShows } = useQuery(TMDB_ON_AIRING_TV_API)

  if (loading || error) {
    return
  }

  return <HorizontalList movies={ onAiringTVShows.results } heading='Hot Movies' />
}

export default OnAiringTVShows
