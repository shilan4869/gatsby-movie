import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from '@reach/router'
import useMenuTabContext from 'src/hooks/useMenuTabContext'
import FontAwesome from 'lib/components/FontAwesome'
import { falFaBars } from 'lib/fontawesome/fontawesome'
import Genres from './Genres'
import clsx from 'lib/utilities/clsx'
import UserPlaceholder from 'src/components/layout/menu/authentication/UserPlaceholder'
import TelevisionIcon from './icon/TelevisionIcon'
import MovieIcon from './icon/MovieIcon'
import BrowseIcon from './icon/BrowseIcon'
import FavoriteIcon from 'src/assets/icon/Favorite.svg'
import Logout from 'src/assets/icon/Logout.svg'
import MenuItem from './MenuItem'
import { TV_TAB, MOVIES_TAB, FAVORITE_TAB, HISTORY_TAB, BROWSE_TAB } from '../constant'
import { PRMIARY_CYAN } from 'src/constants/cssConstants'

const LeftSideMenu = ({ className, isMdScreen }) => {
  const location = useLocation()
  const [ mobileMenuOpened, setMobileMenuOpened ] = useState(false)
  const [ genresOpened, setGenresOpened ] = useState(false)
  const { menuTab, synchronize } = useMenuTabContext()

  const menu = useRef()
  const menuIcon = useRef()

  const tvMenuSelect = () => {
    localStorage.setItem('menuTab', TV_TAB)

    if (location.pathname === '/' && menuTab !== TV_TAB) {
      synchronize()
    }
  }

  const moviesMenuSelect = () => {
    localStorage.setItem('menuTab', MOVIES_TAB)

    if (location.pathname === '/' && menuTab !== MOVIES_TAB) {
      synchronize()
    }
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
            <MenuItem
              title='TV Shows'
              activeCondition={ menuTab === TV_TAB }
              color={ menuTab === TV_TAB ? PRMIARY_CYAN : '#fff' }
              icon={ TelevisionIcon }
              onClick={ tvMenuSelect }
              to='/'
            />
            <MenuItem
              title='Movies'
              activeCondition={ menuTab === MOVIES_TAB }
              color={ menuTab === MOVIES_TAB ? PRMIARY_CYAN : '#fff' }
              icon={ MovieIcon }
              onClick={ moviesMenuSelect }
              to='/'
            />
            <MenuItem
              title='Favorite'
              activeCondition={ menuTab === FAVORITE_TAB }
              color={ menuTab === FAVORITE_TAB ? PRMIARY_CYAN : '#fff' }
              icon={ FavoriteIcon }
              onClick={ () => {} }
              to='/'
            />
            <MenuItem
              title='History'
              activeCondition={ menuTab === HISTORY_TAB }
              color={ menuTab === HISTORY_TAB ? PRMIARY_CYAN : '#fff' }
              icon={ Logout }
              onClick={ () => {} }
              to='/'
            />
            <MenuItem
              title='Genres'
              activeCondition={ menuTab === BROWSE_TAB || genresOpened }
              color={ menuTab === BROWSE_TAB || genresOpened ? PRMIARY_CYAN : '#fff' }
              icon={ BrowseIcon }
              to='/browse'
              onClick={ handleToggleGenres }
              onMouseEnter={ handleOpenGenres }
              onMouseLeave={ handleCloseGenres }
              onBlur={ handleCloseGenres }
            >
              { genresOpened && <Genres /> }
            </MenuItem>
          </div>
        </div>
      </div>
      { mobileMenuOpened && <div className='absolute inset-0 bg-black-25 z-5' /> }
    </>
  )
}

export default LeftSideMenu
