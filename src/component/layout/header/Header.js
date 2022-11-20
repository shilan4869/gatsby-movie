import React, { useState, useEffect, useRef, memo } from 'react'
import FontAwesome from 'lib/components/FontAwesome'
import { falFaBars } from 'lib/fontawesome/fontawesome'
import UserPlaceholder from './authentication/UserPlaceholder'
import SearchBox from './SearchBox'
import NetflixLogo from 'src/assets/img/netflix.png'


const Header = () => {
  console.log('Header Rendered')

  const initialWidth = window.innerWidth
  const [ isHugeScreen, setIsHugeScreen ] = useState(initialWidth >= 1200)
  const headerRef = useRef()
  const checkWindowWidth = () => {
    const xlScreenWidth = 1200

    if (window.innerWidth >= xlScreenWidth) {
      setIsHugeScreen(true)
    } else {
      setIsHugeScreen(false)
    }
  }

  const checkIsWindowOnTop = () => {
    if (window.scrollY === 0) {
      console.log('TOP!!!')
      headerRef.current.style.background = 'linear-gradient(180deg,rgba(0,0,0,1) 35%,transparent)'
    } else {
      headerRef.current.style.backgroundColor = 'black'
    }
  }

  const openMenu = () => {
    console.log('menu opened')
  }

  useEffect(() => {
    window.addEventListener('resize', checkWindowWidth)
    window.addEventListener('scroll', checkIsWindowOnTop)

    return () => {
      window.removeEventListener('resize', checkWindowWidth)
      window.removeEventListener('scroll', checkIsWindowOnTop)
    }
  }, [])

  return (
    <div className='fixed left-0 right-0 top-0 h-16 gradient-top z-20 md:z-10 duration-500' ref={ headerRef }>
      <div className='xl:max-w-full relative'>
        <FontAwesome icon={ falFaBars } className='absolute w-12 p-3 md:hidden cursor-pointer' onClick={ openMenu } />
        <div className='absolute top-4 left-14 md:left-4 right-4 justify-start'>
          <img src={ NetflixLogo } alt='netfix' className='w-24' />
        </div>
        <UserPlaceholder className='absolute top-16 md:top-3 xl:top-20 w-1/2 md:w-1/5 xl:w-1/6 md:right-5 xl:left-0' />
        <SearchBox className='w-1/3 absolute sm:block right-14 md:right-28 top-0 p-2 xl:right-0 xl:w-1/6' actived={ isHugeScreen } />
      </div>
    </div>
  )
}

export default memo(Header)
