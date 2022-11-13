import React from 'react'
import { TMDB_UPCOMING_MOVIE_API } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import HorizontalList from './HorizontalList'

const UpcomingMovies = () => {
  const { loading, error, data: upcomingMovies } = useQuery(TMDB_UPCOMING_MOVIE_API)


  if (loading || error) {
    return
  }

  return <HorizontalList movies={ upcomingMovies.results } heading='Upcoming Movies' />
}

export default UpcomingMovies
