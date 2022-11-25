import React from 'react'
import clsx from 'lib/utilities/clsx'
import { PrimaryButton, SecondaryButton } from '../utilities/Button'
import { TMDB_SMALL_BACKDROP_ORIGIN } from 'src/constants/apiConstants'
import Star from 'src/assets/icon/Star.svg'

const HorizontalMovie = ({ className, movie }) => {
  const { backdrop_path: backdropPath, vote_average: voteAverage } = movie
  const numberOfStar = Math.floor(Number(voteAverage) * 10) / 10

  return (
    <div className={ clsx('m-2 rounded-xl group cursor-pointer', className) }>
      <div className='relative transform-none group-hover:scale-105 group-hover:z-50 group-hover:animate-sharpen duration-300'>
        <div className='aspect-ratio aspect-h-9 aspect-w-16 rounded-xl overflow-hidden'>
          <img src={ TMDB_SMALL_BACKDROP_ORIGIN + (backdropPath || '/olPXihyFeeNvnaD6IOBltgIV1FU.jpg') } alt='movie' className='swiper-lazy object-cover' />
        </div>
        <div className='absolute left-4 top-4 px-4 py-2 md:px-3 md:py-1 flex items-center bg-primary-cyan text-white rounded-2xl hover:scale-125 transition-all'>
          <p className='text-lg md:text-base mt-1 md:mt-px mr-1'>{ numberOfStar }</p>
          <span>
            <Star className='w-4 h-4' />
          </span>
        </div>
        <div className='absolute left-0 top-0 bottom-0 right-0 gradient-bottom' />
        <PrimaryButton className='opacity-0 md:group-hover:opacity-100 absolute right-12 bottom-12 sm:right-4 sm:bottom-4'>
          Watch
        </PrimaryButton>
        <SecondaryButton className='opacity-0 md:group-hover:opacity-100 absolute left-12 bottom-12 sm:left-4 sm:bottom-4'>
          Add
        </SecondaryButton>
        <div className='opacity-0 group-hover:opacity-100 duration-500 absolute -bottom-8 left-0 right-0 flex justify-center text-shadow'>{ movie.title }</div>
      </div>
    </div>
  )
}

export default HorizontalMovie
