import React from 'react'
import clsx from 'lib/utilities/clsx'
import VerticalMovie from 'src/components/movie/VerticalMovie'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const HorizontalList = ({ movies, heading, className }) => {
  if (!movies) {
    return
  }

  return (
    <div className={ clsx('w-full flex flex-col', className) }>
      <div className='text-xl lg:text-2xl font-medium p-3 mt-2 text-shadow'>{ heading }</div>
      <Swiper
        slidesPerView={ 4 }
        slidesPerGroup={ 4 }
        loop
        navigation
        breakpoints={ {
          1400: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        } }
        touchStartPreventDefault={ false }
        modules={ [ Navigation ] }
        className='w-full'
      >
        <div className='swiper-wrapper'>
          { movies.map((movie, index) => (
            <SwiperSlide className='w-1/4 lg:w-1/5 cursor-pointer' key={ index }>
              <VerticalMovie className='w-full' movie={ movie } />
            </SwiperSlide>
          )) }
        </div>
      </Swiper>
    </div>
  )
}

export default HorizontalList
