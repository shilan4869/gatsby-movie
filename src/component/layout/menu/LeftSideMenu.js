import React, { memo, useState, useRef, useEffect } from 'react'
import FontAwesome from 'lib/components/FontAwesome'
import { falFaBars } from 'lib/fontawesome/fontawesome'
import Genres from './Genres'
import clsx from 'lib/utilities/clsx'
import Link from 'lib/components/Link'
import UserPlaceholder from 'src/component/layout/menu/authentication/UserPlaceholder'
import useAuthContext from 'src/hooks/useAuthContext'
import Television from 'src/assets/icon/Television.svg'
import Movie from 'src/assets/icon/Movie.svg'
import Browse from 'src/assets/icon/Genres.svg'

const LeftSideMenu = ({ className, isMdScreen }) => {
  const TV_TAB = 1
  const MOVIES_TAB = 2
  const [ mobileMenuOpened, setMobileMenuOpened ] = useState(false)
  const [ genresOpened, setGenresOpened ] = useState(false)
  const { homepageTab, setHomepageTab } = useAuthContext()
  const menuTab = homepageTab

  const menu = useRef()
  const menuIcon = useRef()
  const tvBar = useRef()
  const tvText = useRef()
  const moviesBar = useRef()
  const moviesText = useRef()
  const genresRef = useRef()
  const genresBar = useRef()
  const genresText = useRef()

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

  const handleToggleGenres = () => {
    setGenresOpened(!genresOpened)
  }

  const handleCloseGenres = () => {
    setGenresOpened(false)
  }

  const toggleMenu = () => {
    setMobileMenuOpened(!mobileMenuOpened)
  }

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

  useEffect(() => {
    const closeMenu = e => {
      if (!menu.current.contains(e.target) && (!menuIcon.current.contains(e.target))) {
        setMobileMenuOpened(false)
      }
    }

    window.addEventListener('click', closeMenu)

    if (isMdScreen) {
      window.removeEventListener('click', closeMenu)
    }

    if (mobileMenuOpened || isMdScreen) {
      menu.current.style.left = '0'
    } else {
      menu.current.style.left = '-100%'
    }

    return () => window.removeEventListener('click', closeMenu)
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
      <div className='fixed px-4 py-3 w-14 md:hidden cursor-pointer z-50' onClick={ toggleMenu } ref={ menuIcon }>
        <FontAwesome icon={ falFaBars } />
      </div>
      <div
        className={ clsx('mt-1 py-2 bg-sub xl:border-r-2 border-dark-gray h-screen md:h-16 xl:h-screen md:bg-transparent xl:bg-sub -left-full md:left-0 md:ml-36 xl:ml-0 z-10 md:z-20 xl:z-10 text-shadow duration-300', className) }
        ref={ menu }
      >
        <UserPlaceholder className='absolute top-20 left-0 w-full md:hidden xl:block' />
        <div className='mt-80 md:mt-0 xl:mt-80 md:flex xl:block'>
          <div className='text-lg xl:text-lg py-4 px-1 md:px-4 md:hidden xl:block font-medium'>Browse your movies</div>
          <Link className='hover:no-underline' to='/'>
            <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4' onClick={ tvMenuSelect }>
              <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ tvBar } />
              <Television className='w-5 h-5 ml-7 md:hidden xl:block' fill={ menuTab === TV_TAB ? '#00B9AE' : '#fff' } />
              <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ tvText }>TV Shows</span>
            </div>
          </Link>
          <Link className='hover:no-underline' to='/'>
            <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4' onClick={ moviesMenuSelect }>
              <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ moviesBar } />
              <Movie className='w-5 h-6 ml-7 md:hidden xl:block' fill={ menuTab === MOVIES_TAB ? '#00B9AE' : '#fff' } />
              <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ moviesText }>Movies</span>
            </div>
          </Link>
          <div
            className='py-4 md:py-1 xl:py-4 md:pl-4 flex md:flex-col-reverse xl:flex-row hover:no-underline cursor-pointer'
            ref={ genresRef }
            onClick={ handleToggleGenres }
            onMouseEnter={ handleOpenGenres }
            onMouseLeave={ handleCloseGenres }
            onBlur={ handleCloseGenres }
          >
            <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ genresBar } />
            <Browse className='w-5 h-5 ml-7 md:hidden xl:block' fill='#fff' />
            <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ genresText }>Genres</span>
            { genresOpened && <Genres /> }
          </div>
        </div>
      </div>
      { mobileMenuOpened && <div className='absolute inset-0 bg-black-25 z-5' /> }
    </>
  )
}

export default memo(LeftSideMenu)
