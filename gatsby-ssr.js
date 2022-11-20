import React from 'react'
import AuthProvider from 'src/context/authContext'
import Header from 'src/component/layout/header/Header'
import LeftSideMenu from 'src/component/layout/menu/LeftSideMenu'


export const wrapPageElement = ({ element }) => (
  <AuthProvider>
    <div className='bg w-full relative min-h-screen text-white'>
      <LeftSideMenu className='fixed w-1/2 xl:w-1/6 text-base xl:text-lg' />
      <Header />
      { element }
    </div>
  </AuthProvider>
)


