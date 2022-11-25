import React, { memo, useState, useRef, useEffect } from 'react'
import FontAwesome from 'lib/components/FontAwesome'
import { falFaBars } from 'lib/fontawesome/fontawesome'
import Genres from './Genres'
import clsx from 'lib/utilities/clsx'
import Link from 'lib/components/Link'
import UserPlaceholder from 'src/component/layout/menu/authentication/UserPlaceholder'
import useAuthContext from 'src/hooks/useAuthContext'

const LeftSideMenu = ({ className, isMdScreen }) => {
  const TV_TAB = 1
  const MOVIES_TAB = 2
  const [ mobileMenuOpened, setMobileMenuOpened ] = useState(false)
  const [ genresOpened, setGenresOpened ] = useState(false)

  const { homepageTab, setHomepageTab } = useAuthContext()
  const menuTab = homepageTab || JSON.parse(localStorage.getItem('menuTab')) || TV_TAB
  const menu = useRef()
  const tvBar = useRef()
  const tvText = useRef()
  const moviesBar = useRef()
  const moviesText = useRef()
  const genresRef = useRef()
  const genresBar = useRef()
  const genresText = useRef()

  useEffect(() => {
    setGenresOpened(false)
    moviesBar.current.style.opacity = '0%'
    tvBar.current.style.opacity = '0%'
    moviesText.current.style.color = 'white'
    tvText.current.style.color = 'white'

    switch (menuTab) {
      case TV_TAB: {
        tvBar.current.style.opacity = '100%'
        tvText.current.style.color = '#00B9AE'
        break
      }

      case MOVIES_TAB: {
        moviesBar.current.style.opacity = '100%'
        moviesText.current.style.color = '#00B9AE'
        break
      }

      default: {
        break
      }
    }
  }, [ menuTab ])


  const tvMenuSelect = () => {
    localStorage.setItem('menuTab', TV_TAB)
    setHomepageTab(TV_TAB)
  }

  const moviesMenuSelect = () => {
    localStorage.setItem('menuTab', MOVIES_TAB)
    setHomepageTab(MOVIES_TAB)
  }

  const handleOpenGenres = () => {
    setGenresOpened(true)
  }

  const handleCloseGenres = () => {
    setGenresOpened(false)
  }

  const openMenu = () => {
    setMobileMenuOpened(!mobileMenuOpened)
  }

  useEffect(() => {
    if (mobileMenuOpened || isMdScreen) {
      menu.current.style.left = '0'
    } else {
      menu.current.style.left = '-100%'
    }
  }, [ mobileMenuOpened, isMdScreen ])

  useEffect(() => {
    if (genresOpened) {
      genresBar.current.style.opacity = '100%'
    } else {
      genresBar.current.style.opacity = '0%'
    }
  }, [ genresOpened ])

  return (
    <>
      <FontAwesome icon={ falFaBars } className='absolute w-12 p-3 md:hidden cursor-pointer z-50' onClick={ openMenu } />
      <div
        className={ clsx('md:w-full mt-1 p-2 bg xl:border-r border-light-gray h-screen md:h-16 xl:h-screen md:bg-transparent xl:bg-black-10 -left-full md:ml-28 xl:ml-0 z-10 md:z-20 xl:z-10 text-shadow duration-300', className) }
        ref={ menu }
      >
        <UserPlaceholder className='absolute top-20 md:top-2 left-0 md:left-auto md:right-32 xl:left-0 xl:top-20 w-full md:w-1/5 xl:w-full' />
        <div className='mt-80 md:mt-0 xl:mt-80 md:flex xl:block'>
          <div className='text-lg xl:text-xl py-4 px-2 md:hidden xl:block'>Browse your movies</div>
          <Link className='hover:no-underline' to='/'>
            <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 px-4' onClick={ tvMenuSelect }>
              <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ tvBar } />
              <span className='ml-10 md:ml-0 xl:ml-10 md:mt-1 xl:mt-0 opacity-80 hover:opacity-100' ref={ tvText }>TV Shows</span>
            </div>
          </Link>
          <Link className='hover:no-underline' to='/'>
            <div className='flex md:flex-col-reverse  xl:flex-row py-4 md:py-1 xl:py-4 px-4' onClick={ moviesMenuSelect }>
              <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ moviesBar } />
              <span className='ml-10 md:ml-0 xl:ml-10 md:mt-1 xl:mt-0 opacity-80 hover:opacity-100' ref={ moviesText }>Movies</span>
            </div>
          </Link>
          <div
            className='py-4 md:py-1 xl:py-4 px-4 flex md:flex-col-reverse xl:flex-row hover:no-underline cursor-pointer'
            ref={ genresRef }
            onMouseEnter={ handleOpenGenres }
            onActive={ handleOpenGenres }
            onMouseLeave={ handleCloseGenres }
            onBlur={ handleCloseGenres }
          >
            <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ genresBar } />
            <span className='ml-10 md:ml-0 xl:ml-10 md:mt-1 xl:mt-0 opacity-80 hover:opacity-100' ref={ genresText }>Genres</span>
            { genresOpened && <Genres /> }
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(LeftSideMenu)
