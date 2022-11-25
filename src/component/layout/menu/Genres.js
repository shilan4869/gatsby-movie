import React from 'react'
import useAuthContext from 'src/hooks/useAuthContext'
import { Link } from 'gatsby'
import clsx from 'lib/utilities/clsx'

const Genres = ({ className }) => {
  const { genres } = useAuthContext()
  const genresArray = Array.from(genres, ([ name, value ]) => (value))

  return (
    <div className={ clsx('absolute left-full -ml-2 top-0 bg opacity-95 pt-14 w-full h-full overflow-hidden justify-between border-l border-light-gray', className) }>
      { genresArray.map((genre, index) => (
        <Link
          className='block hover:no-underline py-3 md:py-1 xl:py-3 px-4 opacity-70 hover:opacity-100'
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
