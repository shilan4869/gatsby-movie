import React from 'react'
import { TMDB_POPULAR_API } from 'src/constants/apiConstants'
import useQuery from 'lib/hooks/useQuery'
import 'swiper/css'
import 'swiper/css/navigation'
import HorizontalList from 'src/component/list/horizontal/HorizontalList'

const Index = () => {
  const { loading, error, data } = useQuery(TMDB_POPULAR_API)

  if (loading || error) {
    return
  }

  return (
    <div className='boundary'>
      <HorizontalList movies={ data.results } />
    </div>
  )
}

export default Index
