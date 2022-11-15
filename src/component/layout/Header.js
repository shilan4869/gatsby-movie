import React, { useState, useEffect, useRef, memo } from 'react'
import SearchBox from './SearchBox'


const Header = () => {
  console.log('Header Rendered')

  const initialWidth = window.innerWidth
  const [ isHugeScreen, setIsHugeScreen ] = useState(initialWidth >= 1200)
  const headerRef = useRef()
  const checkWindowWidth = () => {
    if (window.innerWidth >= 992) {
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

  useEffect(() => {
    window.addEventListener('resize', checkWindowWidth)
    window.addEventListener('scroll', checkIsWindowOnTop)

    return () => {
      window.removeEventListener('resize', checkWindowWidth)
      window.removeEventListener('scroll', checkIsWindowOnTop)
    }
  }, [])

  return (
    <div className='fixed left-0 right-0 top-0 h-16 gradient-top z-50 duration-500' ref={ headerRef }>
      <div className='boundary xl:max-w-full relative'>
        <SearchBox className='absolute hidden sm:block right-20 top-0 p-2 lg:right-0 lg:w-1/4 lg:opacity-70 hover:opacity-100 focus-within:opacity-100' actived={ isHugeScreen } />
      </div>
    </div>
  )
}

export default memo(Header)
