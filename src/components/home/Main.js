import React from 'react'
import TvShows from './TvShows'
import Movies from './Movies'
import Carousel from 'src/components/carousel/Carousel'
import useMenuTabContext from 'src/hooks/useMenuTabContext'
import { MOVIES_TAB } from '../layout/constant'


const Main = ({ className }) => {
  const { menuTab } = useMenuTabContext()

  const MainContent = (menuTab === MOVIES_TAB) ? () => <Movies /> : () => <TvShows />

  return (
    <div className={ className }>
      <Carousel />
      <MainContent />
    </div>
  )
}

export default Main
