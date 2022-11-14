import React, { useRef, useEffect } from 'react'
import useQuery from 'lib/hooks/useQuery'
import { TMDB_NOW_PLAYING_MOVIE_API, TMDB_BACKDROP_ORIGIN } from 'src/constants/apiConstants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import playButton from 'src/assets/img/play-button.png'

const Carousel = () => {
  const { loading, error, data: nowPlayingMovies } = useQuery(TMDB_NOW_PLAYING_MOVIE_API)
  const swiperRef = useRef()
  // I don't want the Carousel autoplay while I've been doing other stuff
  const handleWindowFocus = () => {
    if (!swiperRef.current) {
      return
    }

    swiperRef.current.autoplay.start()
    console.log('resume')
  }

  const handleWindowBlur = () => {
    if (!swiperRef.current) {
      return
    }

    swiperRef.current.autoplay.stop()
    console.log('pause')
  }


  useEffect(() => {
    window.addEventListener('blur', handleWindowBlur)
    window.addEventListener('focus', handleWindowFocus)

    return () => {
      window.removeEventListener('blur', handleWindowBlur)
      window.removeEventListener('focus', handleWindowFocus)
    }
  }, [])

  if (loading || error) {
    return
  }

  const movies = nowPlayingMovies.results

  const onInit = Swiper => {
    swiperRef.current = Swiper
  }

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop()
    }
  }
  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start()
    }
  }

  return (
    <div className='px-3' onMouseEnter={ handleMouseEnter } onMouseLeave={ handleMouseLeave }>
      <Swiper
        centeredSlides
        autoplay={ {
          delay: 1000,
          disableOnInteraction: false,
        } }
        loop
        modules={ [ Autoplay ] }
        onInit={ onInit }
        className='rounded-2xl cursor-pointer'
      >
        { movies.map((movie, index) => (
          <SwiperSlide className='w-full text-white aspect-ratio aspect-h-9 aspect-w-16' key={ index }>
            <img src={ TMDB_BACKDROP_ORIGIN + movie.backdrop_path } alt={ movie.title } className='object-cover' />
            <div className='absolute left-24 top-3/4 flex bg-red-500'>
              <div className='text-3xl font-semibold'>
                { movie.title }
              </div>
            </div>
            <div className='absolute opacity-0 hover:opacity-100 transition-opacity bg-black-25 left-0 top-0 bottom-0 right-0 flex items-center justify-center'>
              <img src={ playButton } alt='play' className='h-16 w-16 opacity-95' />
            </div>
          </SwiperSlide>
        )) }
      </Swiper>
    </div>
  )
}

export default Carousel
