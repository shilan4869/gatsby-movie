import clsx from 'lib/utilities/clsx'
import React from 'react'
import { PrimaryButton, SecondaryButton } from '../utilities/Button'
import { TMDB_POSTER_ORIGIN } from 'src/constants/apiConstants'


const VerticalMovie = ({ className, movie }) => {
  const { poster_path: posterPath } = movie

  console.log(movie)

  return (
    <div className={ clsx('p-3', className) }>
      <div className='relative overflow-hidden rounded-lg'>
        <div className='aspect-ratio aspect-h-3 aspect-w-2 w-full'>
          <img src={ TMDB_POSTER_ORIGIN + posterPath } alt='' />
        </div>
        <PrimaryButton className='absolute right-4 bottom-4 md:right-6 md:bottom-6 lg:right-8 lg:bottom-8'>
          Watch
        </PrimaryButton>
        <SecondaryButton className='absolute left-4 bottom-4 md:left-6 md:bottom-6 lg:left-8 lg:bottom-8'>
          Add
        </SecondaryButton>
      </div>
    </div>
  )
}

export default VerticalMovie
