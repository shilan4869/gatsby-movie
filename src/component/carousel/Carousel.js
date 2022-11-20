import React, { useRef, useEffect } from 'react'
import useQuery from 'lib/hooks/useQuery'
import { TMDB_NOW_PLAYING_MOVIE_API, TMDB_BACKDROP_ORIGIN } from 'src/constants/apiConstants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import { Tags } from '../utilities/Button'
import Image from 'lib/components/Image'
import playButton from 'src/assets/img/play-button.png'
import useAuthContext from 'src/hooks/useAuthContext'

const Carousel = () => {
  const { loading, error, data: nowPlayingMovies } = useQuery(TMDB_NOW_PLAYING_MOVIE_API)
  const swiperRef = useRef()
  const { genres } = useAuthContext()


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
        className='rounded-xl cursor-pointer overflow-hidden aspect-ratio aspect-w-16 aspect-h-9'
      >
        { movies.map((movie, index) => (
          <SwiperSlide className='w-full group' key={ index }>
            <Image src={ TMDB_BACKDROP_ORIGIN + movie.backdrop_path } alt={ movie.title } className='object-cover' />
            <div className='absolute flex flex-col bottom-5 left-8 right-8 md:left-20 md:right-20 md:bottom-16 z-10'>
              <div className='text-2xl md:text-3xl font-semibold text-shadow shadow-black md:mb-6'>
                { movie.title }
              </div>
              <div className='hidden text-xs md:text-sm lg:text-base sm:block text-shadow shadow-black lg:mb-4'>
                { movie.overview }
              </div>
              <div className='hidden lg:flex flex-wrap -ml-1'>
                { movie?.genre_ids?.map(genreId => (
                  <Tags key={ genreId } className='mt-2 mr-2'>
                    { genres.get(genreId) }
                  </Tags>)) }
              </div>
            </div>
            <div className='absolute gradient-bottom left-0 right-0 top-0 bottom-0' />
            <div className='absolute opacity-0 group-hover:opacity-100 transition-opacity bg-black-25 left-0 top-0 bottom-0 right-0 flex items-center justify-center'>
              <img src={ playButton } alt='play' className='h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 opacity-100' />
            </div>
          </SwiperSlide>
        )) }
      </Swiper>
    </div>
  )
}

export default Carousel
