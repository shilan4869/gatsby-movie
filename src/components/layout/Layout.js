import React, { useState, useEffect, memo } from 'react'
import AuthProvider from 'src/context/authContext'
import Header from 'src/components/layout/header/Header'
import LeftSideMenu from 'src/components/layout/menu/LeftSideMenu'
import MenuTabProvider from 'src/context/menuTabContext'
import GenresProvider from 'src/context/genresContext'

const Layout = ({ children }) => {
  const XL_SCREEN = 1200
  const MD_SCREEN = 768

  const [ isXlScreen, setIsXlScreen ] = useState(false)
  const [ isMdScreen, setIsMdScreen ] = useState(false)

  useEffect(() => {
    const initialWidth = window.innerWidth

    setIsMdScreen(initialWidth >= MD_SCREEN)
    setIsXlScreen(initialWidth >= XL_SCREEN)

    const throttle = (cb, delay = 300) => {
      let shouldWait

      return () => {
        if (shouldWait) {
          return
        }

        shouldWait = true
        setTimeout(() => {
          cb()
          shouldWait = false
        }, delay)
      }
    }

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

    window.addEventListener('resize', throttle(checkWindowWidth))

    return () => window.removeEventListener('resize', throttle(checkWindowWidth))
  }, [])

  return (

    <div className='bg w-full relative min-h-screen text-white '>
      <AuthProvider>
        <MenuTabProvider>
          <GenresProvider>
            <LeftSideMenu
              className='fixed w-1/2 xl:w-1/6 text-base text-shadow shadow-black'
              isMdScreen={ isMdScreen }
            />
            <Header isXlScreen={ isXlScreen } />
            { children }
          </GenresProvider>
        </MenuTabProvider>
      </AuthProvider>
    </div>

  )
}

export default memo(Layout)
