import React from 'react'
import Link from 'lib/components/Link'
import clsx from 'lib/utilities/clsx'
import useGenresContext from 'src/hooks/useGenresContext'

const Genres = ({ className }) => {
  const { genres } = useGenresContext()
  const genresArray = Array.from(genres, ([ name, value ]) => [ name, value ]) || []

  return (
    <div className={ clsx('absolute left-full md:left-0 xl:left-full top-0 md:top-12 md:px-4 xl:top-0 flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap xl:flex-col xl:-ml-0 bg-sub pt-14 md:py-2 xl:pt-14 w-full h-screen md:w-auto md:h-auto xl:w-full xl:h-screen overflow-hidden border-l border-dark-gray md:rounded-xl xl:rounded-none shadow-lg shadow-black', className) }>
      { genresArray.length && genresArray.map((genre, index) => (
        <Link
          className='block text-sm xl:text-base md:span-6 md:flex hover:no-underline py-3 pl-6 opacity-70 hover:opacity-100'
          to={ `/browse?genre=${ genre[ 0 ] }` }
          key={ index }
        >
          { genre[ 1 ] }
        </Link>
      )) }
    </div>
  )
}

export default Genres
