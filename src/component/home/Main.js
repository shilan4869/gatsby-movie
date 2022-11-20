import React, { useEffect } from 'react'
import TvShows from './TvShows'
import Movies from './Movies'
import Carousel from 'src/component/carousel/Carousel'
import useAuthContext from 'src/hooks/useAuthContext'


const Main = ({ className }) => {
  const TV_TAB = 1
  const { homepageTab, setHomepageTab } = useAuthContext()
  const menuTab = JSON.parse(localStorage.getItem('menuTab')) || TV_TAB

  useEffect(() => {
    setHomepageTab(menuTab)
  }, [ setHomepageTab, menuTab ])

  const MainContent = (homepageTab === TV_TAB) ? () => <TvShows /> : () => <Movies />

  return (
    <div className={ className }>
      <Carousel />
      <MainContent />
    </div>
  )
}

export default Main
