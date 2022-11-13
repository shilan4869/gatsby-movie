import React from 'react'
import VerticalMovie from 'src/component/movie/verticalMovie'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const HorizontalList = ({ movies }) => {
  if (!movies) {
    return
  }

  return (
    <Swiper
      slidesPerView='auto'
      slidesPerGroup={ 1 }
      grabCursor
      loop
      breakpoints={ {
        576: {
          slidesPerGroup: 2,
        },
        768: {
          slidesPerGroup: 4,
        },
        992: {
          slidesPerGroup: 5,
        },
      } }
      pagination={ {
        clickable: true,
      } }
      navigation
      modules={ [ Pagination, Navigation ] }
      className='max-w-7xl'
    >
      { movies.map((movie, index) => (
        <SwiperSlide className='w-1/2 md:w-1/4 lg:w-1/5' key={ index }>
          <VerticalMovie className='w-full' movie={ movie } />
        </SwiperSlide>
      )) }

    </Swiper>
  )
}

export default HorizontalList
