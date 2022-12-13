import React, { useState, useRef, useEffect } from 'react'
import useMenuTabContext from 'src/hooks/useMenuTabContext'
import FontAwesome from 'lib/components/FontAwesome'
import { falFaBars } from 'lib/fontawesome/fontawesome'
import Genres from './Genres'
import clsx from 'lib/utilities/clsx'
import Link from 'lib/components/Link'
import UserPlaceholder from 'src/components/layout/menu/authentication/UserPlaceholder'
import TelevisionIcon from './icon/TelevisionIcon'
import MovieIcon from './icon/MovieIcon'
import BrowseIcon from './icon/BrowseIcon'
import Favorite from 'src/assets/icon/Favorite.svg'
import Logout from 'src/assets/icon/Logout.svg'
import { TV_TAB, MOVIES_TAB, FAVORITE_TAB, BOOKMARK_TAB, BROWSE_TAB } from '../constant'
import { PRMIARY_CYAN } from 'src/constants/cssConstants'

const LeftSideMenu = ({ className, isMdScreen }) => {
  const [ mobileMenuOpened, setMobileMenuOpened ] = useState(false)
  const [ genresOpened, setGenresOpened ] = useState(false)
  const { menuTab, setMenuTab } = useMenuTabContext()

  const menu = useRef()
  const menuIcon = useRef()

  const tvMenuSelect = () => {
    localStorage.setItem('menuTab', TV_TAB)
    setMenuTab(TV_TAB)
  }

  const moviesMenuSelect = () => {
    localStorage.setItem('menuTab', MOVIES_TAB)
    setMenuTab(MOVIES_TAB)
  }

  const handleOpenGenres = () => {
    setGenresOpened(true)
  }

  const handleToggleGenres = () => {
    setGenresOpened(!genresOpened)
  }

  const handleCloseGenres = () => {
    // if (menuTab !== BROWSE_TAB) {
    //   genresBar.current.style.opacity = '0%'
    // }

    setGenresOpened(false)
  }

  const toggleMenu = () => {
    setMobileMenuOpened(!mobileMenuOpened)
  }

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

  /** synchronize the menu with previous user session */
  useEffect(() => {
    const localTab = localStorage.getItem('menuTab')

    if (localTab) {
      setMenuTab(Number(localTab))
    } else {
      localStorage.setItem('menuTab', TV_TAB)
      setMenuTab(Number(TV_TAB))
    }
  }, [ setMenuTab ])


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
                <div
                  className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto'
                  style={ menuTab === TV_TAB ? {} : { opacity: '0' } }
                />
                <TelevisionIcon className='w-5 h-5 ml-9 md:hidden xl:block' fill={ menuTab === TV_TAB ? PRMIARY_CYAN : '#fff' } />
                <span
                  className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100'
                  style={ menuTab !== TV_TAB ? {} : { color: PRMIARY_CYAN } }
                >TV Shows
                </span>
              </div>
            </Link>
            <Link className='hover:no-underline' to='/'>
              <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4' onClick={ moviesMenuSelect }>
                <div
                  className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto'
                  style={ menuTab === MOVIES_TAB ? {} : { opacity: '0' } }
                />
                <MovieIcon className='w-5 h-6 ml-9 md:hidden xl:block' fill={ menuTab === MOVIES_TAB ? PRMIARY_CYAN : '#fff' } />
                <span
                  className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100'
                  style={ menuTab !== MOVIES_TAB ? {} : { color: PRMIARY_CYAN } }
                >Movies
                </span>
              </div>
            </Link>
            <Link className='hover:no-underline' to='/'>
              <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4'>
                <div
                  className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto'
                  style={ menuTab === FAVORITE_TAB ? {} : { opacity: '0' } }
                />
                <Favorite className='w-5 h-6 ml-9 md:hidden xl:block' fill={ menuTab === FAVORITE_TAB ? PRMIARY_CYAN : '#fff' } />
                <span
                  className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100'
                  style={ menuTab !== FAVORITE_TAB ? {} : { color: PRMIARY_CYAN } }
                >Favorite
                </span>
              </div>
            </Link>
            <Link className='hover:no-underline' to='/'>
              <div className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4'>
                <div
                  className='w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto'
                  style={ menuTab === BOOKMARK_TAB ? {} : { opacity: '0' } }
                />
                <Logout className='w-5 h-6 ml-9 md:hidden xl:block' fill={ menuTab === BOOKMARK_TAB ? PRMIARY_CYAN : '#fff' } />
                <span
                  className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100'
                  style={ menuTab !== BOOKMARK_TAB ? {} : { color: PRMIARY_CYAN } }
                >Bookmark
                </span>
              </div>
            </Link>
            <div
              className='flex md:flex-col-reverse xl:flex-row py-4 md:py-1 xl:py-4 md:px-4 cursor-pointer'
              onClick={ handleToggleGenres }
              onMouseEnter={ handleOpenGenres }
              onMouseLeave={ handleCloseGenres }
              onBlur={ handleCloseGenres }
            >
              <div
                className={ 'w-1 rounded-r-md bg-primary-cyan md:w-full md:h-1 md:mt-1 xl:mt-0 md:rounded-none md:rounded-t-md xl:w-1 xl:rounded-none xl:rounded-r-md xl:h-auto' }
                style={ (menuTab === BROWSE_TAB) || genresOpened ? {} : { opacity: '0' } }
              />
              <BrowseIcon className='w-5 h-5 ml-9 mt-1 md:hidden xl:block' fill={ menuTab === BROWSE_TAB ? PRMIARY_CYAN : '#fff' } />
              <span
                className='ml-5 md:ml-0 xl:ml-5 opacity-80 hover:opacity-100'
                style={ (menuTab !== BROWSE_TAB) && !genresOpened ? {} : { color: PRMIARY_CYAN } }
              >Genres
              </span>
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
