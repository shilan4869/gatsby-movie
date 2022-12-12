import React, { useState, useRef, useEffect, useCallback } from 'react'
import FontAwesome from 'lib/components/FontAwesome'
import { falFaBars } from 'lib/fontawesome/fontawesome'
import Genres from './Genres'
import clsx from 'lib/utilities/clsx'
import Link from 'lib/components/Link'
import UserPlaceholder from 'src/components/layout/menu/authentication/UserPlaceholder'
import useAuthContext from 'src/hooks/useAuthContext'
import TelevisionIcon from './icon/TelevisionIcon'
import MovieIcon from './icon/MovieIcon'
import BrowseIcon from './icon/BrowseIcon'
import Favorite from 'src/assets/icon/Favorite.svg'
import Logout from 'src/assets/icon/Logout.svg'
import { TV_TAB, MOVIES_TAB, FAVORITE_TAB, BOOKMARK_TAB, BROWSE_TAB } from '../constant'

const LeftSideMenu = ({ className, isMdScreen }) => {
  const [ mobileMenuOpened, setMobileMenuOpened ] = useState(false)
  const [ genresOpened, setGenresOpened ] = useState(false)
  const { homepageTab, setHomepageTab } = useAuthContext()

  const menuTab = homepageTab

  const menu = useRef()
  const genresRef = useRef()

  const bookmarkBar = useRef()
  const favoriteBar = useRef()
  const tvBar = useRef()
  const moviesBar = useRef()
  const genresBar = useRef()

  const favoriteText = useRef()
  const bookmarkText = useRef()
  const tvText = useRef()
  const moviesText = useRef()
  const genresText = useRef()

  const menuIcon = useRef()
  const tvIconRef = useRef()
  const movieIconRef = useRef()
  const genresIconRef = useRef()

  const hideAllBars = () => {
    moviesBar.current.style.opacity = '0%'
    tvBar.current.style.opacity = '0%'
    favoriteBar.current.style.opacity = '0%'
    bookmarkBar.current.style.opacity = '0%'
    moviesText.current.style.color = 'white'
    tvText.current.style.color = 'white'
    genresText.current.style.color = 'white'
    movieIconRef.current.setAttribute('fill', '#fff')
    tvIconRef.current.setAttribute('fill', '#fff')
    genresIconRef.current.setAttribute('fill', '#fff')
  }

  const tvMenuSelect = () => {
    localStorage.setItem('menuTab', TV_TAB)
    setHomepageTab(TV_TAB)
  }

  const moviesMenuSelect = () => {
    localStorage.setItem('menuTab', MOVIES_TAB)
    setHomepageTab(MOVIES_TAB)
  }

  const handleOpenGenres = () => {
    genresBar.current.style.opacity = '100%'
    setGenresOpened(true)
  }

  const handleToggleGenres = () => {
    setGenresOpened(!genresOpened)
  }

  const handleCloseGenres = useCallback(() => {
    if (homepageTab !== BROWSE_TAB) {
      genresBar.current.style.opacity = '0%'
    }

    setGenresOpened(false)
  }, [ homepageTab ])

  const toggleMenu = () => {
    setMobileMenuOpened(!mobileMenuOpened)
  }

  useEffect(() => {
    handleCloseGenres()
    hideAllBars()

    switch (menuTab) {
      case TV_TAB: {
        tvBar.current.style.opacity = '100%'
        tvText.current.style.color = '#00B9AE'
        tvIconRef.current.setAttribute('fill', '#00B9AE')
        break
      }

      case MOVIES_TAB: {
        moviesBar.current.style.opacity = '100%'
        moviesText.current.style.color = '#00B9AE'
        movieIconRef.current.setAttribute('fill', '#00B9AE')
        break
      }

      case BROWSE_TAB: {
        genresBar.current.style.opacity = '100%'
        genresText.current.style.color = '#00B9AE'
        genresIconRef.current.setAttribute('fill', '#00B9AE')
        break
      }

      default: {
        break
      }
    }
  }, [ menuTab, handleCloseGenres ])

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


  return (
    <>
      <div className='fixed px-4 py-3 w-14 md:hidden cursor-pointer z-50' onClick={ toggleMenu } ref={ menuIcon }>
        <FontAwesome icon={ falFaBars } />
      </div>
      <div
        className={ clsx('mt-1 py-2 bg-sub xl:border-r-2 border-dark-gray h-screen md:h-16 xl:h-screen md:bg-transparent xl:bg-sub -left-full md:left-0 md:ml-32 xl:ml-0 z-10 md:z-20 xl:z-10 text-shadow duration-300', className) }
        ref={ menu }
      >
        <div className='text-lg md:text-sm lg:text-lg'>
          <UserPlaceholder className='absolute top-24 left-0 w-full md:hidden xl:block' />
          <div className='mt-48 md:mt-0 xl:mt-48 md:flex xl:block'>
            <Link className='hover:no-underline' to='/'>
              <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4' onClick={ tvMenuSelect }>
                <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ tvBar } />
                <TelevisionIcon className='w-5 h-5 ml-9 md:hidden xl:block' fill='#fff' ref={ tvIconRef } />
                <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ tvText }>TV Shows</span>
              </div>
            </Link>
            <Link className='hover:no-underline' to='/'>
              <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4' onClick={ moviesMenuSelect }>
                <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ moviesBar } />
                <MovieIcon className='w-5 h-6 ml-9 md:hidden xl:block' fill='#fff' ref={ movieIconRef } />
                <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ moviesText }>Movies</span>
              </div>
            </Link>
            <Link className='hover:no-underline' to='/'>
              <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4'>
                <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ favoriteBar } />
                <Favorite className='w-5 h-6 ml-9 md:hidden xl:block' fill='#fff' />
                <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ favoriteText }>Favorite</span>
              </div>
            </Link>
            <Link className='hover:no-underline' to='/'>
              <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4'>
                <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ bookmarkBar } />
                <Logout className='w-5 h-6 ml-9 md:hidden xl:block' fill='#fff' />
                <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ bookmarkText }>Bookmark</span>
              </div>
            </Link>
            <div
              className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4'
              ref={ genresRef }
              onClick={ handleToggleGenres }
              onMouseEnter={ handleOpenGenres }
              onMouseLeave={ handleCloseGenres }
              onBlur={ handleCloseGenres }
            >
              <div className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' ref={ genresBar } />
              <BrowseIcon className='w-5 h-5 ml-9 mt-1 md:hidden xl:block' fill='#fff' ref={ genresIconRef } />
              <span className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100' ref={ genresText }>Genres</span>
              { genresOpened && <Genres /> }
            </div>
          </div>
        </div>
      </div>
      { mobileMenuOpened && <div className='absolute inset-0 bg-black-25 z-5' /> }
    </>
  )
}

export default LeftSideMenu
