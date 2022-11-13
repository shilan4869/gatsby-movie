import clsx from 'lib/utilities/clsx'
import React from 'react'
import { PrimaryButton, SecondaryButton } from '../utilities/Button'
import { TMDB_POSTER_ORIGIN } from 'src/constants/apiConstants'
import Star from 'src/assets/icon/Star.svg'


const VerticalMovie = ({ className, movie }) => {
  const { poster_path: posterPath, vote_average: voteAverage } = movie

  return (
    <div className={ clsx('p-3 overflow-hidden rounded-xl', className) }>
      <div className='relative overflow-hidden rounded-xl transform-none hover:scale-105 hover:animate-sharpen duration-300'>
        <div className='aspect-ratio aspect-h-3 aspect-w-2 w-full '>
          <img src={ TMDB_POSTER_ORIGIN + posterPath } alt='movie' className='swiper-lazy' />
        </div>
        <div className='absolute left-4 top-4 px-4 py-2 md:px-3 md:py-1 flex items-center bg-primary-cyan text-white rounded-2xl hover:scale-125 transition-all'>
          <p className='text-lg md:text-base mt-1 md:mt-px mr-1'>{ voteAverage }</p>
          <span>
            <Star className='w-6 h-6 md:w-4 md:h-4' />
          </span>
        </div>
        <div className='absolute left-0 top-0 right-0 bottom-0 gradient' />
        <PrimaryButton className='absolute right-4 bottom-4'>
          Watch
        </PrimaryButton>
        <SecondaryButton className='absolute left-4 bottom-4'>
          Add
        </SecondaryButton>
      </div>
    </div>
  )
}

export default VerticalMovie
