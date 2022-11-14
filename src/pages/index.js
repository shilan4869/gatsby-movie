import React from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import UpcomingMovies from 'src/component/list/horizontal/UpcomingMovies'
import PopularMovies from 'src/component/list/horizontal/PopularMovies'
import TrendingMovies from 'src/component/list/horizontal/TrendingMovies'
import ToprateMovies from 'src/component/list/horizontal/ToprateMovies'
import Carousel from 'src/component/carousel/Carousel'

const Index = () => (
  <div className='boundary bg min-h-screen py-6'>
    <Carousel />
    <PopularMovies />
    <TrendingMovies />
    <ToprateMovies />
    <UpcomingMovies />
  </div>
)

export default Index
