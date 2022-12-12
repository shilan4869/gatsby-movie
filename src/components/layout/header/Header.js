import React, { useEffect, useRef } from 'react'
import useAuthContext from 'src/hooks/useAuthContext'
import SearchBox from './SearchBox'
import UserPlaceholder from 'src/components/layout/menu/authentication/UserPlaceholder'
import NetflixLogo from 'src/assets/img/netflix.png'
import { Link } from 'gatsby'
import { TV_TAB } from '../constant'


const Header = ({ isXlScreen }) => {
  const { setHomepageTab } = useAuthContext()
  const headerRef = useRef()

  const checkIsWindowOnTop = () => {
    if (window.scrollY === 0) {
      headerRef.current.style.background = 'linear-gradient(180deg,rgba(0,0,0,1) 35%,transparent)'
    } else {
      headerRef.current.style.backgroundColor = 'black'
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkIsWindowOnTop)

    return () => {
      window.removeEventListener('scroll', checkIsWindowOnTop)
    }
  }, [])

  return (
    <div className='fixed left-0 right-0 top-0 h-16 gradient-top z-20 md:z-10 duration-500' ref={ headerRef }>
      <div className='xl:max-w-full relative'>
        <Link
          className='absolute top-3 md:top-4 left-14 md:left-6 xl:left-12 right-6 justify-start w-24'
          to='/'
          onClick={ () => setHomepageTab(Number(localStorage.getItem('menuTab')) || TV_TAB) }
        >
          <img src={ NetflixLogo } alt='netfix' className='w-24' />
        </Link>
        <UserPlaceholder className='absolute top-2 right-4 w-1/4 hidden md:flex xl:hidden' />
        <SearchBox className='w-1/2 md:w-1/4 lg:w-1/3 xl:w-1/6 absolute top-0 right-0 md:right-24 xl:right-0 p-2' actived={ isXlScreen } />
      </div>
    </div>
  )
}

export default Header
