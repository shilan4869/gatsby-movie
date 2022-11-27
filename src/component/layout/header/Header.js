import React, { useEffect, useRef, memo } from 'react'
import SearchBox from './SearchBox'
import UserPlaceholder from 'src/component/layout/menu/authentication/UserPlaceholder'
import NetflixLogo from 'src/assets/img/netflix.png'
import { Link } from 'gatsby'


const Header = ({ isXlScreen }) => {
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
          className='absolute top-4 left-16 md:left-6 right-6 justify-start'
          to='/'
        >
          <img src={ NetflixLogo } alt='netfix' className='w-24' />
        </Link>
        <UserPlaceholder className='absolute top-3 right-4 w-1/4 hidden md:flex xl:hidden' />
        <SearchBox className='w-1/2 md:w-1/3 absolute top-0 right-0 md:right-14 p-2 xl:right-0 xl:w-1/6' actived={ isXlScreen } />
      </div>
    </div>
  )
}

export default memo(Header)
