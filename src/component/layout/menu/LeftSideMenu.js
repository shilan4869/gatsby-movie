import React, { memo, useState, useRef, useEffect } from 'react'
import clsx from 'lib/utilities/clsx'
import Link from 'lib/components/Link'
import useAuthContext from 'src/hooks/useAuthContext'

const LeftSideMenu = ({ className }) => {
  const TV_TAB = 1
  const MOVIES_TAB = 2
  const [ genresOpened, setGenresOpened ] = useState(false)

  const { homepageTab, setHomepageTab } = useAuthContext()
  const menuTab = homepageTab || JSON.parse(localStorage.getItem('menuTab')) || TV_TAB
  const tvBar = useRef()
  const tvText = useRef()
  const moviesBar = useRef()
  const moviesText = useRef()
  const genresBar = useRef()
  const genresText = useRef()

  useEffect(() => {
    moviesBar.current.style.opacity = '0%'
    tvBar.current.style.opacity = '0%'
    moviesText.current.style.opacity = '60%'
    tvText.current.style.opacity = '60%'

    switch (menuTab) {
      case TV_TAB: {
        tvBar.current.style.opacity = '100%'
        tvText.current.style.opacity = '100%'

        break
      }

      case MOVIES_TAB: {
        moviesBar.current.style.opacity = '100%'
        moviesText.current.style.opacity = '100%'
        break
      }

      default: {
        setGenresOpened(false)
        break
      }
    }

    if (genresOpened) {
      genresBar.current.style.opacity = '100%'
      genresText.current.style.opacity = '100%'
    } else {
      genresBar.current.style.opacity = '0%'
      genresText.current.style.opacity = '60%'
    }
  }, [ menuTab, genresOpened ])


  const tvMenuSelect = () => {
    localStorage.setItem('menuTab', TV_TAB)
    setHomepageTab(TV_TAB)
  }

  const moviesMenuSelect = () => {
    localStorage.setItem('menuTab', MOVIES_TAB)
    setHomepageTab(MOVIES_TAB)
  }

  const genresMenuSelect = () => {
    setGenresOpened(!genresOpened)
    console.log(genresOpened)
  }

  return (
    <div className={ clsx('mt-1 p-2 bg opacity-95 xl:border-r border-light-gray h-screen md:h-16 xl:h-screen md:bg-transparent xl:bg-black-10 md:left-28 xl:left-0 z-10 md:z-50 xl:z-10 text-shadow', className) }>
      <div className='mt-72 md:mt-0 xl:mt-80 md:flex xl:block'>
        <div className='text-lg xl:text-xl py-4 px-2 md:hidden xl:block'>Browse your movies</div>
        <Link className='hover:no-underline' to='/'>
          <div className='flex md:flex-col-reverse  xl:flex-row py-4 md:py-1 xl:py-4 px-4' onClick={ tvMenuSelect }>
            <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ tvBar } />
            <span className='ml-10 md:ml-0 xl:ml-10 md:mt-1 xl:mt-0' ref={ tvText }>TV Shows</span>
          </div>

        </Link>
        <Link className='hover:no-underline' to='/'>
          <div className='flex md:flex-col-reverse  xl:flex-row py-4 md:py-1 xl:py-4 px-4' onClick={ moviesMenuSelect }>
            <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ moviesBar } />
            <span className='ml-10 md:ml-0 xl:ml-10 md:mt-1 xl:mt-0' ref={ moviesText }>Movies</span>
          </div>
        </Link>
        <div
          className='py-4 md:py-1 xl:py-4 px-4 flex md:flex-col-reverse xl:flex-row hover:no-underline cursor-pointer'
          onClick={ genresMenuSelect }
        >
          <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ genresBar } />
          <span className='ml-10 md:ml-0 xl:ml-10 md:mt-1 xl:mt-0' ref={ genresText }>Genres</span>
        </div>
      </div>
    </div>
  )
}

export default memo(LeftSideMenu)
