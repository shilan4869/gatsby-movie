import React from 'react'
import VerticalMovie from 'src/component/movie/verticalMovie'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const HorizontalList = ({ movies, heading }) => {
  if (!movies) {
    return
  }


  return (
    <div className='w-full flex flex-col'>
      <h3 className='text-white'>{ heading }</h3>
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
        navigation
        modules={ [ Navigation ] }
        className='w-full'
      >
        <div className='swiper-wrapper'>
          { movies.map((movie, index) => (
            <SwiperSlide className='w-1/2 md:w-1/4 lg:w-1/5' key={ index }>
              <VerticalMovie className='w-full' movie={ movie } />
            </SwiperSlide>
          )) }
        </div>
      </Swiper>
    </div>
  )
}

export default HorizontalList
