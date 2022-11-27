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
    <div className={ clsx('w-full flex flex-col h-full  border-l-2 border-dark-gray p-2', className) }>
      <div className='text-xl lg:text-2xl font-medium p-3'>{ heading }</div>
      <Swiper
        slidesPerView={ 5 }
        slidesPerGroup={ 5 }
        direction='vertical'
        mousewheel
        loop
        freeMode
        speed={ 300 }
        breakpoints={ {
          1600: {
            slidesPerView: 4,
            slidesPerGroup: 4,
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
