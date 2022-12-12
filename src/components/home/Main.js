import React from 'react'
import TvShows from './TvShows'
import Movies from './Movies'
import Carousel from 'src/components/carousel/Carousel'
import useAuthContext from 'src/hooks/useAuthContext'


const Main = ({ className }) => {
  const TV_TAB = 1
  const { homepageTab } = useAuthContext()

  const MainContent = (homepageTab === TV_TAB) ? () => <TvShows /> : () => <Movies />

  return (
    <div className={ className }>
      <Carousel />
      <MainContent />
    </div>
  )
}

export default Main
