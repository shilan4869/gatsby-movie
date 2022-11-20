import React, { memo } from 'react'
import UpcomingMovies from 'src/component/list/horizontal/UpcomingMovies'
import PopularMovies from 'src/component/list/horizontal/PopularMovies'
import TrendingMovies from 'src/component/list/horizontal/TrendingMovies'
import ToprateMovies from 'src/component/list/horizontal/ToprateMovies'

const Movies = () => (
  <>
    <PopularMovies />
    <TrendingMovies />
    <ToprateMovies />
    <UpcomingMovies />
  </>
)

export default memo(Movies)
