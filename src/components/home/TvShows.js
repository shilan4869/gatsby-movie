import React, { memo } from 'react'
import TrendingTVShows from '../list/horizontal/TrendingTVShows'
import OnTheAirTVShows from '../list/horizontal/OnTheAirTVShows'
import PopularTVShows from '../list/horizontal/PopularTVShows'
import ToprateTVShows from '../list/horizontal/ToprateTVShows'

const TvShows = ({ className }) => (
  <>
    <PopularTVShows className={ className } />
    <TrendingTVShows />
    <ToprateTVShows />
    <OnTheAirTVShows />
  </>
)

export default memo(TvShows)
