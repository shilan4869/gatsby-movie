import React from 'react'
import clsx from 'lib/utilities/clsx'
import VerticalMovie from 'src/component/movie/VerticalMovie'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const HorizontalList = ({ movies, heading, className }) => {
  if (!movies) {
    return
  }


  return (
    <div className={ clsx('w-full flex flex-col', className) }>
      <h3 className='p-3 mt-2'>{ heading }</h3>
      <Swiper
        slidesPerView={ 4 }
        slidesPerGroup={ 4 }
        grabCursor
        loop
        navigation
        breakpoints={ {
          992: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        } }
        modules={ [ Navigation ] }
        className='w-full'
      >
        <div className='swiper-wrapper '>
          { movies.map((movie, index) => (
            <SwiperSlide className='w-1/4 lg:w-1/5' key={ index }>
              <VerticalMovie className='w-full' movie={ movie } />
            </SwiperSlide>
          )) }
        </div>
      </Swiper>
    </div>
  )
}

export default HorizontalList
