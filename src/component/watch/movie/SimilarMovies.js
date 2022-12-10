import React from 'react'
import clsx from 'lib/utilities/clsx'
import { TMDB_GET_SIMILAR, API_KEY } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import VerticalList from 'src/component/list/vertical/VerticalList'

const SimilarMovies = ({ className, id }) => {
  const ApiEndpoint = `${ TMDB_GET_SIMILAR }movie/${ id }/similar`
  const { loading, error, data: similarMovies } = useQuery(ApiEndpoint, { query: { api_key: API_KEY } })

  if (loading || error) {
    return
  }

  return (
    <div className={ clsx('h-screen bg-sub', className) }>
      <VerticalList movies={ similarMovies.results } heading='Similar Movies' className={ className } />
    </div>
  )
}

export default SimilarMovies
