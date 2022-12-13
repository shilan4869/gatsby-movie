import React from 'react'
import TvShows from './TvShows'
import Movies from './Movies'
import Carousel from 'src/components/carousel/Carousel'
import useMenuTabContext from 'src/hooks/useMenuTabContext'


const Main = ({ className }) => {
  const TV_TAB = 1
  const { menuTab } = useMenuTabContext()

  const MainContent = (menuTab === TV_TAB) ? () => <TvShows /> : () => <Movies />

  return (
    <div className={ className }>
      <Carousel />
      <MainContent />
    </div>
  )
}

export default Main
