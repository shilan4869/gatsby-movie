import React from 'react'
import clsx from 'lib/utilities/clsx'
import Image from 'lib/components/Image'
import { Link } from 'gatsby'
import { PrimaryButton, SecondaryButton } from '../utilities/Button'
import { TMDB_POSTER_ORIGIN } from 'src/constants/apiConstants'
import Star from 'src/assets/icon/Star.svg'

const VerticalMovie = ({ className, movie }) => {
  const { poster_path: posterPath, vote_average: voteAverage, id } = movie
  const numberOfStar = Math.floor(Number(voteAverage) * 10) / 10 || 5

  return (
    <Link
      className={ clsx('block p-1 md:p-3 overflow-hidden rounded-xl group', className) }
      to={ `/watch/?id=${ id }` }
    >
      <div className='relative overflow-hidden rounded-xl transform-none group-hover:scale-105 group-hover:animate-sharpen duration-300'>
        <div className='aspect-ratio aspect-h-3 aspect-w-2 w-full'>
          <Image src={ TMDB_POSTER_ORIGIN + (posterPath || '/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg') } alt='movie' className='swiper-lazy object-cover' />
        </div>
        <div className='absolute left-2 md:left-4 top-2 md:top-4 px-2 md:px-3 md:py-1 flex items-center bg-primary-cyan text-white rounded-2xl hover:scale-125 transition-all'>
          <p className='text-sm md:text-base mt-1 md:mt-px mr-1'>{ numberOfStar }</p>
          <span>
            <Star className='w-2 h-2 md:w-4 md:h-4' />
          </span>
        </div>
        <div className='absolute left-0 top-0 bottom-0 right-0 gradient-bottom' />
        <PrimaryButton className='opacity-0 md:group-hover:opacity-100 absolute right-12 bottom-12 sm:right-4 sm:bottom-4'>
          Watch
        </PrimaryButton>
        <SecondaryButton className='opacity-0 md:group-hover:opacity-100 absolute left-12 bottom-12 sm:left-4 sm:bottom-4'>
          Add
        </SecondaryButton>
      </div>
    </Link>
  )
}

export default VerticalMovie
