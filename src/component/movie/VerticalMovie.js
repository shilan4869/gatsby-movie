import React, { memo } from 'react'
import clsx from 'lib/utilities/clsx'
import { prefetch } from 'lib/utilities/prefetch'
import Image from 'lib/components/Image'
import Link from 'lib/components/Link'
import { PrimaryButton, SecondaryButton } from '../utilities/Button'
import { TMDB_POSTER_ORIGIN, TMDB_MOVIE_ORIGIN, TMDB_TV_ORIGIN, API_KEY } from 'src/constants/apiConstants'
import Star from 'src/assets/icon/Star.svg'
import useAuthContext from 'src/hooks/useAuthContext'

const VerticalMovie = ({ className, movie }) => {
  const { homePageTab } = useAuthContext()
  const { poster_path: posterPath, vote_average: voteAverage, id } = movie
  const numberOfStar = Math.floor(Number(voteAverage) * 10) / 10 || 5
  const apiURL = homePageTab === 1 ? `${ TMDB_TV_ORIGIN }/${ id }` : `${ TMDB_MOVIE_ORIGIN }/${ id }`
  const preFecthMovie = () => {
    prefetch(apiURL, { api_key: API_KEY })
  }


  return (
    <Link
      className={ clsx('block p-1 mb-12 md:p-3 group', className) }
      to={ `/watch/?id=${ id }` }
      onPrefetch={ preFecthMovie }
    >
      <div className='relative transform-none group-hover:scale-105 group-hover:z-50 group-hover:animate-sharpen duration-300'>
        <div className='aspect-ratio aspect-h-3 aspect-w-2 overflow-hidden rounded-t-xl'>
          <Image src={ TMDB_POSTER_ORIGIN + (posterPath || '/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg') } alt='movie' className='swiper-lazy object-cover' />
        </div>
        <div className='absolute left-2 md:left-4 top-2 md:top-4 px-2 md:px-3 md:py-1 flex items-center bg-primary-cyan text-white rounded-2xl hover:scale-125 transition-all'>
          <p className='text-sm md:text-base mt-1 md:mt-px mr-1'>{ numberOfStar }</p>
          <span>
            <Star className='w-2 h-2 md:w-4 md:h-4' />
          </span>
        </div>
        <div className='absolute inset-0 gradient-bottom' />
        <PrimaryButton className='opacity-0 md:group-hover:opacity-100 absolute right-12 bottom-12 sm:right-4 sm:bottom-4'>
          Watch
        </PrimaryButton>
        <SecondaryButton className='opacity-0 md:group-hover:opacity-100 absolute left-12 bottom-12 sm:left-4 sm:bottom-4'>
          Add
        </SecondaryButton>
        <div className='duration-500 absolute -bottom-11 left-0 right-0 py-3 flex justify-center rounded-b-xl bg-black-10'>
          <div className='max-w-64 px-2 text-ellipsis whitespace-nowrap overflow-hidden text-shadow opacity-80 group-hover:opacity-100'>{ movie.title || movie.name || movie.original_name }</div>
        </div>
      </div>
    </Link>
  )
}

export default memo(VerticalMovie)
