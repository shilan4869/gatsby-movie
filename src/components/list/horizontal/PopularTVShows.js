import React from 'react'
import { TMDB_POPULAR_TV_API, API_KEY } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import HorizontalList from './HorizontalList'

const PopularTVShows = ({ className }) => {
  const { loading, error, data: popularTVShows } = useQuery(TMDB_POPULAR_TV_API, { query: { api_key: API_KEY } })

  if (loading || error) {
    return
  }

  return <HorizontalList movies={ popularTVShows.results } heading='Popular TV Shows' className={ className } />
}

export default PopularTVShows
