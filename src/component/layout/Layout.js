import React, { useState, useEffect } from 'react'
import AuthProvider from 'src/context/authContext'
import Header from 'src/component/layout/header/Header'
import LeftSideMenu from 'src/component/layout/menu/LeftSideMenu'

const Layout = ({ children }) => {
  const XL_SCREEN = 1200
  const MD_SCREEN = 768

  const [ isXlScreen, setIsXlScreen ] = useState(false)
  const [ isMdScreen, setIsMdScreen ] = useState(false)

  useEffect(() => {
    const initialWidth = window.innerWidth

    setIsMdScreen(initialWidth >= MD_SCREEN)
    setIsXlScreen(initialWidth >= XL_SCREEN)

    const checkWindowWidth = () => {
      if (window.innerWidth >= XL_SCREEN) {
        setIsXlScreen(true)
      } else {
        setIsXlScreen(false)
      }

      if (window.innerWidth >= MD_SCREEN) {
        setIsMdScreen(true)
      } else {
        setIsMdScreen(false)
      }
    }

    window.addEventListener('resize', checkWindowWidth)

    return () => window.removeEventListener('resize', checkWindowWidth)
  }, [])

  return (
    <AuthProvider>
      <div className='bg w-full relative min-h-screen text-white'>
        <LeftSideMenu className='fixed w-1/2 xl:w-1/6 text-base' isMdScreen={ isMdScreen } />
        <Header isXlScreen={ isXlScreen } />
        { children }
      </div>
    </AuthProvider>
  )
}

export default Layout
