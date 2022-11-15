import React from 'react'
import { Tags } from '../utilities/Button'
import useAuthContext from 'src/hooks/useAuthContext'
import RecommenedMovies from '../list/vertical/RecommenedMovies'
import clsx from 'lib/utilities/clsx'


const RightSide = ({ className }) => {
  const { genres } = useAuthContext()
  const genresArray = Array.from(genres, ([ name, value ]) => value)

  return (
    <div className={ clsx('h-screen', className) }>
      { /* <div className='text-2xl mt-4 mb-5 ml-2'>Browse hot genres bellow</div>
      <div className='w-full flex flex-wrap'>
        { genresArray.map((genre, index) => (
          <Tags
            key={ index }
            className='text-xs mt-1 mr-1 lg:text-sm xl:mt-2 xl:mr-2'
          >
            { genre }
          </Tags>)) }
      </div> */ }
      <RecommenedMovies className='mt-2' />
    </div>
  )
}

export default RightSide
