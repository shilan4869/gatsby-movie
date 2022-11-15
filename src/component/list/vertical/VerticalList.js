import React from 'react'
import clsx from 'lib/utilities/clsx'
import HorizontalMovie from 'src/component/movie/HorizontalMovie'
import { Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const VerticalList = ({ movies, heading, className }) => {
  if (!movies) {
    return
  }


  return (
    <div className={ clsx('w-full flex flex-col h-full', className) }>
      <h3 className='p-3 mt-2 text-white'>{ heading }</h3>
      <Swiper
        slidesPerView={ 5 }
        slidesPerGroup={ 5 }
        direction='vertical'
        mousewheel
        loop
        freeMode
        speed={ 300 }
        breakpoints={ {
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1400: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        } }
        className='w-full'
        modules={ [ Mousewheel ] }
      >
        <div className='swiper-wrapper'>
          { movies.map((movie, index) => (
            <SwiperSlide key={ index }>
              <HorizontalMovie movie={ movie } />
            </SwiperSlide>
          )) }
        </div>
      </Swiper>
    </div>
  )
}

export default VerticalList
