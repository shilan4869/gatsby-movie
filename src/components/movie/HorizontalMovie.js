import React, { memo } from 'react'
import clsx from 'lib/utilities/clsx'
import { prefetch } from 'lib/utilities/prefetch'
import { PrimaryButton, SecondaryButton } from '../utilities/Button'
import { TMDB_SMALL_BACKDROP_ORIGIN, TMDB_TV_ORIGIN, TMDB_MOVIE_ORIGIN, API_KEY } from 'src/constants/apiConstants'
import Star from 'src/assets/icon/Star.svg'
import Link from 'lib/components/Link'
import useAuthContext from 'src/hooks/useAuthContext'

const HorizontalMovie = ({ className, movie }) => {
  const { homepageTab } = useAuthContext()
  const { poster_path: backdropPath, vote_average: voteAverage, id } = movie
  const numberOfStar = Math.floor(Number(voteAverage) * 10) / 10 || 5
  const apiURL = homepageTab === 1 ? `${ TMDB_TV_ORIGIN }/${ id }` : `${ TMDB_MOVIE_ORIGIN }/${ id }`
  const watchUrl = homepageTab === 1 ? `/watch/tv?id=${ id }` : `/watch/movie?id=${ id }`
  const preFecthMovie = () => {
    prefetch(apiURL, { api_key: API_KEY })
  }


  return (
    <Link
      className={ clsx('block m-2 group cursor-pointer', className) }
      to={ watchUrl }
      onPrefetch={ preFecthMovie }
    >
      <div className='relative transform-none group-hover:scale-105 group-hover:z-50 group-hover:animate-sharpen duration-300 shadow-lg shadow-light-gray'>
        <div className='aspect-ratio aspect-h-9 aspect-w-16 rounded-t-xl overflow-hidden'>
          <img src={ TMDB_SMALL_BACKDROP_ORIGIN + (backdropPath || '/olPXihyFeeNvnaD6IOBltgIV1FU.jpg') } alt='movie' className='swiper-lazy object-cover' />
        </div>
        <div className='absolute left-2 top-2 px-3 py-1 flex items-center bg-primary-cyan text-white rounded-2xl hover:scale-125 transition-all'>
          <p className='text-lg md:text-base mt-1 md:mt-px mr-1'>{ numberOfStar }</p>
          <span>
            <Star className='w-4 h-4' />
          </span>
        </div>
        <div className='absolute inset-0 gradient-bottom' />
        <PrimaryButton className='opacity-0 md:group-hover:opacity-100 absolute right-12 bottom-12 sm:right-4 sm:bottom-4'>
          Watch
        </PrimaryButton>
        <SecondaryButton className='opacity-0 md:group-hover:opacity-100 absolute left-12 bottom-12 sm:left-4 sm:bottom-4'>
          Add
        </SecondaryButton>
        <div className='duration-500 absolute -bottom-10 left-0 right-0 py-2 flex justify-center rounded-b-xl bg-black-10'>
          <div className='max-w-64 text-ellipsis whitespace-nowrap overflow-hidden text-shadow opacity-80 group-hover:opacity-100'>{ movie.title || movie.name || movie.original_name }</div>
        </div>
      </div>
    </Link>
  )
}

export default memo(HorizontalMovie)
