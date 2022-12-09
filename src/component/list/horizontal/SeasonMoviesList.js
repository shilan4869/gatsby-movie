import React from 'react'
import clsx from 'lib/utilities/clsx'
import Link from 'lib/components/Link'
import { TMDB_SMALL_BACKDROP_ORIGIN } from 'src/constants/apiConstants'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { isClient } from 'lib/utilities/is'

const SeasonMovie = ({ movie, className, poster }) => {
  const params = isClient ? new URLSearchParams(location.search) : null
  const id = isClient ? params?.get('id') : ''

  const { still_path: stillPath, name, season_number: season, episode_number: episode } = movie

  return (
    <Link
      className={ clsx('block px-1 group cursor-pointer', className) }
      to={ `/watch/tv?id=${ id }&season=${ season }&episode=${ episode }` }
    >
      <div className='relative transform-none group-hover:scale-105 group-hover:z-50 group-hover:animate-sharpen duration-300 shadow shadow-dark-gray rounded-xl mb-1'>
        <div className='aspect-ratio aspect-h-9 aspect-w-16 rounded-xl overflow-hidden'>
          <img src={ TMDB_SMALL_BACKDROP_ORIGIN + (stillPath || poster) } alt='movie' className='swiper-lazy object-cover' />
        </div>
        <div className='absolute inset-0 gradient-bottom' />
        <div className='duration-500 absolute bottom-0 left-0 right-0 py-2 flex justify-center rounded-xl bg-black-10'>
          <div className='max-w-64 text-ellipsis whitespace-nowrap overflow-hidden text-shadow opacity-80 group-hover:opacity-100 rounded-xl px-1 text-sm md:text-base'>{ `E${ episode } - ${ name }` }</div>
        </div>
      </div>
    </Link>
  )
}

const SeasonMoviesList = ({ movies, poster }) => {
  if (!movies) {
    return
  }

  return (
    <div className='w-full absolute left-0 right-0 top-10 mb-16 px-0 md:px-3'>
      <Swiper
        slidesPerView='auto'
        navigation
        freeMode
        touchStartPreventDefault={ false }
        modules={ [ Navigation ] }
        className={ 'w-full' }
      >
        <div className='swiper-wrapper'>
          { movies.map((movie, index) => (
            <SwiperSlide className='w-1/4 lg:w-1/5 cursor-pointer' key={ index }>
              <SeasonMovie className='w-full' movie={ movie } poster={ poster } />
            </SwiperSlide>
          )) }
        </div>
      </Swiper>
    </div>
  )
}

export default SeasonMoviesList
