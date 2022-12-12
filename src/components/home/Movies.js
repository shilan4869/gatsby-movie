import React, { memo } from 'react'
import UpcomingMovies from 'src/components/list/horizontal/UpcomingMovies'
import PopularMovies from 'src/components/list/horizontal/PopularMovies'
import TrendingMovies from 'src/components/list/horizontal/TrendingMovies'
import ToprateMovies from 'src/components/list/horizontal/ToprateMovies'

const Movies = ({ className }) => (
  <>
    <PopularMovies className={ className } />
    <TrendingMovies />
    <ToprateMovies />
    <UpcomingMovies />
  </>
)

export default memo(Movies)
