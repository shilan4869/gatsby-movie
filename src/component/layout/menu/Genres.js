import React from 'react'
import useAuthContext from 'src/hooks/useAuthContext'
import { Link } from 'gatsby'
import clsx from 'lib/utilities/clsx'

const Genres = ({ className }) => {
  const { genres } = useAuthContext()
  const genresArray = Array.from(genres, ([ name, value ]) => (value))

  return (
    <div className={ clsx('absolute left-full md:left-0 xl:left-full top-0 md:top-12 md:px-4 xl:top-0 md:flex md:flex-wrap xl:block -ml-2 md:ml-0 xl:-ml-2 bg opacity-95 pt-14 md:py-2 xl:pt-14 w-full h-screen md:w-auto md:h-auto xl:w-full xl:h-screen overflow-hidden border-l border-dark-gray md:rounded-xl xl:rounded-none', className) }>
      { genresArray.map((genre, index) => (
        <Link
          className='block text-sm xl:text-base md:span-6 md:flex hover:no-underline py-3 pl-6 opacity-70 hover:opacity-100'
          to='/search'
          state={ { keyword: genre } }
          key={ index }
        >
          { genre }
        </Link>
      )) }
    </div>
  )
}

export default Genres
